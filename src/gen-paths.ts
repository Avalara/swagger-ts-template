import genTypedefs = require('./gen-typedefs')
import formatter = require('typescript-formatter')

let verbs = ['get', 'put', 'post', 'delete']

export = async function( doc : SwaggerDoc, opts : mergeOpts ) {
    let $typesParser = genTypedefs(doc, opts)
    const $filename = opts.filename || 'paths_' + Math.ceil(Math.random() * 10000) + '.d.ts'

    let out = ''
    //shallow
    Object.keys(doc.paths).map( pathKey => {
        let path = doc.paths[pathKey]
        let rgx = /^\{(.*)\}$/

        Object.keys(path).forEach( (verbKey:SomeVerbs) => {
            let responsesInner = ''

            if (verbs.indexOf(verbKey) === -1 || !path[verbKey]) return
            let responses = path[verbKey].responses
            Object.keys(responses).forEach( (statusCodeKey) => {
                let schema = responses[statusCodeKey].schema
                if (!schema) return
                let parse = $typesParser.fromSwaggerType(schema, 'response' + statusCodeKey)
                responsesInner += parse + '\n'

                let nsname = pathKey.split('/').map(item => {
                        if (rgx.test(item)) item = item.replace(rgx, '_$1_')
                        item = item.replace(/[^a-z|A-Z|0-9]+/g, '_')
                        return item
                    })
                    .filter(Boolean)
                    .concat([verbKey])
                    .join('.')
                out += `export namespace ${nsname} { \n ${responsesInner} \n }\n\n`                
            })
        })
    })

    let result = await formatter.processString($filename , out, {
        editorconfig: false,
        replace: true,
        tsconfig: false,
        tsfmt: false,
        tslint: false,
        verify: false
    })
    return result.dest

}