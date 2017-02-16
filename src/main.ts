import _ = require('lodash')
import formatter = require('typescript-formatter')
const wordwrap = require('word-wrap')

type SwaggerDoc = {
    swagger: string //version
    info : any
    host : string
    'x-swagger-namespace' : string
    schemes: string[]
    produces: string
    basepath?: string
    paths : { [path:string] : any }
    parameters : any
    responses: any
    definitions: { [name:string] : SwaggerType }
}

type SwaggerType = {
    type : string
    description? : string
    maxLength?: number
    $ref?: string
    format?: string
    enum?: (string|number)[]
    properties?: { [name:string] : SwaggerType }
    items?: any
    allOf? : SwaggerType[]
    anyOf? : SwaggerType[]
    required? : string[]
}


var __mainDoc : SwaggerDoc

interface mergeOpts {
    external?: any
    filename?: string
    hideComments?: boolean
}
export async function merge(swaggerDoc, opts : mergeOpts = {}) {
    opts.filename = opts.filename || 'typing_' + Math.ceil(Math.random()*10000) + '.d.ts'
    __mainDoc = swaggerDoc
    var out = '';
    let external = opts.external ? 'export ' : ''
    for ( let name in swaggerDoc.definitions ) {
        //if (name !== 'PurchaseHeaderIn') continue
        let def : SwaggerType = swaggerDoc.definitions[name]

        let templ = typeTemplate(def,4, true)
        out += `
${external}type ${name} = 
${templ.join('\n')}

`
    }
    console.log('dest', opts.filename)
    let result = await formatter.processString(opts.filename, out, {
        editorconfig: false,
        replace: true,
        tsconfig: false,
        tsfmt: false,
        tslint: false,
        verify: false
    })
    return result.dest


    function typeTemplate(swaggerType:SwaggerType, indent = 0, embraceObjects = false) : string[] {
        function wrap() : string[]{
            if (swaggerType.$ref) {
                let split = swaggerType.$ref.split('/')
                return [split[split.length-1]]    
            }

            if (swaggerType.enum) {
                let typestr = swaggerType.enum.reduce((bef,curr) => {
                    if (typeof curr === 'string') curr = `'${curr}'`
                    if (bef) bef += '|'
                    bef += String(curr)
                    return bef
                },'')
                let wrapped = wrapLiteral(typestr)
                return wrapped
            }

            if (~['integer',  'double', 'number'].indexOf(swaggerType.type)) {
                return ['number']
            }

            if (~['string','boolean'].indexOf(swaggerType.type)) {
                return [swaggerType.type]
            }

            if (swaggerType.type === 'object' || swaggerType.properties) {
                let aux = _.toPairs(swaggerType.properties).map( pair => {
                    var [key, prop] = pair as [string,SwaggerType]
                    let current = typeTemplate(prop, indent, true)
                    let required = (swaggerType.required && swaggerType.required.indexOf(key) != -1) ?
                        '' : '?'
                    current[0] = `${key}${required} : ${current[0].trim()}`
                    if (prop.description && !opts.hideComments) {
                        var doc = [
                            '/**',
                            ...wordwrap(prop.description, {width: 60})
                                .split('\n').map(s => ` *  ${s.trim()}`),
                            ' */'
                        ]
                        current = [...doc, ...current]
                    }
                    return current
                })
                let joined = aux.reduce((bef,curr)=>[...bef, ...curr],[])
                if (embraceObjects) {
                    //one-liner
                    if (joined.length === 1) {
                        joined[0] = `{ ${aux[0]} }`
                    } else {
                        joined.unshift('{')
                        joined.push('}')
                    }
                }
                return joined
            }

            if (swaggerType.type === 'array') {
                let inner = typeTemplate(swaggerType.items, 0, true)
                inner[inner.length-1] += '[]'
                return inner
            }

            if (swaggerType.allOf) {
                let merged = mergeAllof(swaggerType)
                return [ '{' , ...typeTemplate(merged) , '}' ]
            }

            if (swaggerType.anyOf) {
                let merged = mergeAllof(swaggerType, 'anyOf')
                return [ '{' , ...typeTemplate(merged) , '}' ]
            }            

            throw swaggerType.type
        }

        return wrap().map( ln => _.repeat(' ',indent) + ln)

    }

}

function mergeAllof( swaggerType:SwaggerType, key : 'allOf'|'anyOf' = 'allOf' ) {
    let item = swaggerType[key]
    if (!item) throw Error('wrong mergeAllOf call.');
    let merged = item.reduce( (prev, toMerge) => {
        let refd : SwaggerType
        if (toMerge.$ref) {
            refd = findDef(__mainDoc, toMerge.$ref.split('/'))
        }
        else {
            refd = toMerge
        }
        if (refd.allOf) refd = mergeAllof(refd, 'allOf')
        else if (refd.anyOf) refd = mergeAllof(refd, 'anyOf')
        if (!refd.properties) {
            console.error('allOf merge: unsupported object type at ' + JSON.stringify(toMerge))
        }
        for ( var it in <any>refd.properties ) {
            if ((<any>prev).properties[it]) console.error('property', it, 'overwritten in ', JSON.stringify(toMerge).substr(0,80));
            (<any>prev).properties[it] = (<any>refd).properties[it]
        }
        return prev
    },{ type : 'object', properties : {}})
    return merged
}

function findDef(src, path:string[]) {
    if(path[0] == '#') path = path.slice(1)
    if (!path.length) return src
    return findDef(src[path[0]], path.slice(1))
}




function wrapLiteral(inp) {
    let items = inp.split('|')
    let allLines : string[] = []
    let currentLine = ''
    items.forEach( i => {
        currentLine += i + '|'
        if (currentLine.length > 40) {
            allLines.push(currentLine)
            currentLine = ''
        }
    })
    if(currentLine) {allLines.push(currentLine)}
    let last = allLines[allLines.length-1]
    last = last.substr(0, last.length-1)
    allLines[allLines.length-1] = last
    return allLines
}