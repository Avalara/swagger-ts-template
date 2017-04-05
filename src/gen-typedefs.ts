import _ = require('lodash')
import formatter = require('typescript-formatter')
const wordwrap = require('word-wrap')

export = function generateTypedefs( __doc : SwaggerDoc, opts : mergeOpts ) {

    const definitionRoot = opts.searchWithin || 'definitions'
    const __filename = opts.filename || 'typing_' + Math.ceil(Math.random() * 10000) + '.d.ts'

    return {
        run,
        typeTemplate
    }

    async function run() {
        let out = '';
        if (!Object.keys(__doc[definitionRoot] || {}).length) {
            throw Error('No definition found in ' + definitionRoot)
        }
        for (let name in __doc[definitionRoot]) {
            //if (name !== 'PurchaseHeaderIn') continue
            let def: SwaggerType = __doc[definitionRoot][name]
            let text = fromSwaggerType(def)
            out += text = '\n\n'
        }
        
        console.log('dest', __filename)
        if (opts.ambient) {
            out = 'declare global {\n' + out + '}'
        }
    
        let result = await formatter.processString(__filename, out, {
            editorconfig: false,
            replace: true,
            tsconfig: false,
            tsfmt: false,
            tslint: false,
            verify: false
        })
        return result.dest
    }


    function fromSwaggerType(def: SwaggerType) {
        let out = ''
        let templ = typeTemplate(def, true)
        let isInterface = ['object', 'allOf', 'anyOf'].indexOf(templ.type) !== -1
        let keyword = isInterface ? 'interface' : 'type'
        let equals = isInterface ? '' : ' = '
        let extend = ''
        if (isInterface && (templ.extends || []).length) {
            extend = 'extends' + ' ' + templ.extends.join(',')
        }
        out += 
`export ${keyword} ${name} ${extend}  ${equals}
${templ.data.join('\n')}`
        return out
    }


    function typeTemplate(swaggerType: SwaggerType, embraceObjects = false) {
        function wrap(): { data: string[], type: string, extends?: string[] } {
            if (swaggerType.$ref) {
                let split = swaggerType.$ref.split('/')
                return {
                    data: [split[split.length - 1]],
                    type: 'ref'
                }
            }

            if (swaggerType.enum) {
                let typestr = swaggerType.enum.reduce((bef, curr) => {
                    if (typeof curr === 'string') curr = `'${String(curr).replace(/'/g, "\\'")}'`
                    if (bef) bef += '|'
                    bef += String(curr)
                    return bef
                }, '')
                let wrapped = wrapLiteral(typestr)
                return { data: wrapped, type: 'enum' }
            }

            if (~['integer', 'double', 'number'].indexOf(swaggerType.type)) {
                return { data: ['number'], type: 'primitive' }
            }

            if (~['string', 'boolean'].indexOf(swaggerType.type)) {
                return { data: [swaggerType.type], type: 'primitive' }
            }

            if (swaggerType.type === 'object' || swaggerType.properties) {
                let aux = _.toPairs(swaggerType.properties).map(pair => {
                    var [key, prop] = pair as [string, SwaggerType]
                    let current = typeTemplate(prop, true).data
                    let required = (swaggerType.required && swaggerType.required.indexOf(key) != -1) ?
                        '' : '?'
                    current[0] = `${key}${required} : ${current[0].trim()}`
                    if (prop.description && !opts.hideComments) {
                        var doc = [
                            '/**',
                            ...wordwrap(prop.description, { width: 60 })
                                .split('\n').map(s => ` *  ${s.trim()}`),
                            ' */'
                        ]
                        current = [...doc, ...current]
                    }
                    return current
                })
                let joined = aux.reduce((bef, curr) => [...bef, ...curr], [])
                if (embraceObjects) {
                    //one-liner
                    if (joined.length === 1) {
                        joined[0] = `{ ${aux[0]} }`
                    } else {
                        joined.unshift('{')
                        joined.push('}')
                    }
                }
                return { data: joined, type: 'object' }
            }

            if (swaggerType.type === 'array') {
                let inner = typeTemplate(swaggerType.items, true).data
                inner[inner.length - 1] += '[]'
                return { data: inner, type: 'array' }
            }

            if (swaggerType.allOf) {
                let merged = mergeAllof(swaggerType)
                return {
                    data: ['{', ...typeTemplate(merged.swaggerDoc).data, '}'],
                    type: 'allOf',
                    extends: merged.extends
                }
            }

            if (swaggerType.anyOf) {
                let merged = mergeAllof(swaggerType, 'anyOf')
                return {
                    data: ['{', ...typeTemplate(merged.swaggerDoc).data, '}'],
                    type: 'anyOf',
                    extends: merged.extends
                }
            }

            throw swaggerType.type
        }

        let out = wrap()
        return {
            data: out.data,
            type: out.type,
            extends: out.extends
        }

    }


    function mergeAllof(swaggerType: SwaggerType, key: 'allOf' | 'anyOf' = 'allOf') {
        let item = swaggerType[key]
        if (!item) throw Error('wrong mergeAllOf call.')
        var extend = [];
        let merged = item.reduce((prev, toMerge) => {
            let refd: SwaggerType
            if (toMerge.$ref) {
                let split = toMerge.$ref.split('/')
                if (split[0] === '#' && split[1] === definitionRoot && split.length === 3) {
                    extend.push(split[2])
                    return prev
                }
                refd = findDef(__doc, split)
            }
            else {
                refd = toMerge
            }
            if (refd.allOf) refd = mergeAllof(refd, 'allOf').swaggerDoc
            else if (refd.anyOf) refd = mergeAllof(refd, 'anyOf').swaggerDoc
            if (!refd.properties) {
                console.error('allOf merge: unsupported object type at ' + JSON.stringify(toMerge))
            }
            for (var it in <any>refd.properties) {
                //if ((<any>prev).properties[it]) console.error('property', it, 'overwritten in ', JSON.stringify(toMerge).substr(0,80));
                ; (<any>prev).properties[it] = (<any>refd).properties[it]
            }
            return prev
        }, { type: 'object', properties: {} })
        return { swaggerDoc: merged, extends: extend }
    }


}


function wrapLiteral(inp) {
    let items = inp.split('|')
    let allLines: string[] = []
    let currentLine = ''
    items.forEach(i => {
        currentLine += i + '|'
        if (currentLine.length > 40) {
            allLines.push(currentLine)
            currentLine = ''
        }
    })
    if (currentLine) { allLines.push(currentLine) }
    let last = allLines[allLines.length - 1]
    last = last.substr(0, last.length - 1)
    allLines[allLines.length - 1] = last
    return allLines
}



function findDef(src, path: string[]) {
    if (path[0] == '#') path = path.slice(1)
    if (!path.length) return src
    return findDef(src[path[0]], path.slice(1))
}