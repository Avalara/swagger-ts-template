import _ = require('lodash')
const wordwrap = require('word-wrap')

type SwaggerType = {
    type : string
    description? : string
    maxLength?: number
    $ref?: string
    format?: string
    enum?: (string|number)[]
    properties?: any
    items?: any
    required? : string[]
}

export function merge(swg, opts : any = {}) {
    var out = '';
    let external = opts.external ? 'export ' : ''
    for ( let name in swg.definitions ) {
        //if (name !== 'PurchaseHeaderIn') continue
        let def : SwaggerType = swg.definitions[name]

        let templ = typeTemplate(def,4, false)
        out += `
${external}type ${name} = {
${templ.join('\n')}
}
`

    }
    return out


    function typeTemplate(swaggerType:SwaggerType, indent = 0,
            embraceObjects = false) : string[] {
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

            throw swaggerType.type
        }

        return wrap().map( ln => _.repeat(' ',indent) + ln)

    }

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