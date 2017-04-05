import genTypedefs = require('./gen-typedefs')

let verbs = ['get', 'put', 'post', 'delete']

export = async function( doc : SwaggerDoc, opts : mergeOpts ) {

    let out = ''
    //shallow
    Object.keys(doc.paths).map( pathKey => {
        let path = doc.paths[pathKey]
        let responsesInner = ''

        Object.keys(path).forEach( (verbKey:SomeVerbs) => {
            if (verbs.indexOf(verbKey) === -1 || !path[verbKey]) return
            let responses = path[verbKey].responses
            Object.keys(responses).forEach( statusCodeKey => {
                let schema = responses[statusCodeKey].schema
                if (!schema) return
                
            })
        })

        out += `'${pathKey}' = { responses : \n ${responsesInner} \n }`
    })

    let wrap = `
    export namespace Paths {
        ${out}
    }
    `

}