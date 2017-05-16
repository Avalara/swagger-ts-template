import camelize = require('camelize')
import _ = require('lodash')
import { promisify } from 'promisify'
import fs = require('fs')
import cp = require('cp')
import { genTypes } from './gen-types'
import mkdirp = require('mkdirp')
import rimraf = require('rimraf')
import path = require('path')

type SwaggerDoc = SwaggerIo.V2.SchemaJson

type genPathsOpts = {
    output : string
}

export async function genPaths(swaggerDoc: SwaggerDoc, opts: genPathsOpts) {

    await promisify( rimraf, opts.output)
    await promisify( mkdirp, path.resolve(opts.output, 'modules') )
    await promisify( cp, '../src/api-common.ts', path.resolve( opts.output ,'api-common.ts') )
    await genTypes(swaggerDoc, {
        external: true ,
        hideComments: true,
        filename: path.resolve(opts.output, 'api-types.d.ts')
    })


    let tags = _.chain(swaggerDoc.paths).toPairs().map( ([path, schema]) => {
        //search for a tag name
        let tag = (() => {
            let verbs = Object.keys(schema)
            let out : string
            for ( let it = 0; it < verbs.length; it++ ) {
                let verb = verbs[it]
                if (verb === 'parameters') continue
                let verbObj : SwaggerIo.V2.SchemaJson.Definitions.Operation = schema[verb]
                if (_.get(verbObj, ['tags','length'])) {
                    out = verbObj.tags[0]
                    break
                }
            }
            return out
        })() || 'NoTag'
        tag = tag.replace(/(\s+)/g, '.').replace(/(\.+)/g,'.')
        tag = camelize(tag)
        let out = _.toPairs(schema).map( ([verb, operation]) => {
            if (verb === 'parameters') return null
            operation['__path__'] = path
            operation['__tag__'] = tag
            operation['__verb__'] = verb
            operation['__parentParameters__'] = schema['parameters'];
            let params = [
                ...(operation['__parentParameters__'] || []),
                ...(operation.parameters || [])
            ].map( p => {
                
                if (p.$ref) p = unRef(p)
                
                if (p.schema) {
                    p.type = p.schema
                }                
                let out : any =  _.pick(p, 'name', 'type', 'required', 'in')
                if (!out.name) throw Error('unexpected')
                return out
            })
            .reduce( (out, line:any) => {
                out[line.name] = line
                return out
            } , {})
            params = _.values(params)

            operation['__mergedParameters__'] = params
            return operation
        }).filter( i => i !== null)
        return out
    }) // [ [Operation], [Operation] ]
    .reduce((out, curr) => {
        return [...out, ...curr]
    }, []) // [ Operation ]
    .groupBy('__tag__' as any) // { [__tag__:string] : Operation[] }
    .value()

    let templateStr = 
`
import ApiCommon = require('../api-common')
import Types = require('../api-types')


<% operations.forEach( operation => { %>
export type <%=operation.operationId%>_Type = <%= paramsType(operation) %>
export type <%=operation.operationId%>_Header = <%= paramsType(operation, true) %>
export const <%=operation.operationId%>
    : ( opts : <%=operation.operationId%>_Type, headerOpts? : <%=operation.operationId%>_Header ) => Promise<<%=responseType(operation)%>>
    = opts => {
        let operation = {
            path: '<%=operation.__path__%>' ,
            verb: '<%=String(operation.__verb__).toUpperCase()%>',
            parameters: <%=JSON.stringify(strip(operation.__mergedParameters__))%>
        }
        let paramBuild = ApiCommon.paramBuilder(operation, opts)
        return ApiCommon.requestHandler()(paramBuild) as any
    }


<% }) %>
`

    let compiled = _.template(templateStr)

    function convertType(type) {
        if (type === 'integer') return 'number'
        if (type.$ref) {
            return refName(type)
        }        
        if (typeof type === 'object' && type !== null) {
            return 'any'
        }
        return type
    }

    function paramsType(operation: SwaggerIo.V2.SchemaJson.Definitions.Operation, header = false ) {
        let params = operation['__mergedParameters__']
        let out = '{'
        let count = 0
        params.forEach( param => {
            if (!param.in && !param.$ref) return
            if (param.schema) {
                param.type = param.schema
            }
            if ((!header && param.in === 'header') || (header && param.in !== 'header')) return
            if (header && param.name === 'Authorization') return
            count++
            out += `\n    '${param.name}' : ${convertType(param.type)}${param.required?'':'|undefined'}`
        })
        if (count) out += '\n'
        out += '}'
        return out
    }

    function responseType(operation: SwaggerIo.V2.SchemaJson.Definitions.Operation) {
        let find : any = _.get(operation, ['responses', '200', 'schema'])
        if (!find) return 'void'
        if (find.type === 'array') {
            if (!_.get(find, ['items', '$ref'])) return 'any[]'
            let typeNameSplit = find.items.$ref.split('/')
            let typeName = typeNameSplit[typeNameSplit.length-1]
            return `Types.${typeName}[]`
        } else {
            if (!find.$ref) return 'any'
            let typeNameSplit = find.$ref.split('/')
            let typeName = typeNameSplit[typeNameSplit.length - 1]
            return `Types.${typeName}`
        }
    }
    
    let wait = _.toPairs(tags).map( async ([tag, operations]) => {
        let merged = compiled({ operations, paramsType, responseType, strip })
        await promisify( fs.writeFile, './output/modules/' + tag + '.ts', merged )
    })

    await Promise.all(wait)

    function unRef(param) {
        let path = param.$ref.substr(2).split('/')
        let found = _.get(swaggerDoc, path)
        return found
    }

    function refName(param) {
        let split = param.$ref.split('/')
        return 'Types.' + split[split.length-1]
    }

    function strip(op:any[]) {
        return op.map( line => _.omit(line, 'type') )
    }

}


