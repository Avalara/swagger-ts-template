import genTypedefs = require('./gen-typedefs')
import genPaths = require('./gen-paths')
import genMongo = require('./gen-mongoose')
import fs = require('fs')

export async function merge(swaggerDoc, opts : mergeOpts = {}) {
    try {
        await genTypedefs( swaggerDoc, opts ).run()
        if (opts.paths) await genPaths(swaggerDoc, opts)
    } catch(err) {
        console.log(err)
        throw err
    }
}

export async function mongoose(swaggerDoc) {

    var source = genMongo.run(swaggerDoc)

    function isOneLiner(obj) {
        return Object.keys(obj).filter( key => {
            let item = obj[key]
            if (item === undefined) return false
            return true
        }).length === 1
    }

    var out = ''
    Object.keys(source).forEach( key => {
        var item = source[key]
        var extend : string[] = []
        var stringified = JSON.stringify(item, (key, value) => {
            if (key === '__extends__') {
                extend = [...extend, ...value]
                return undefined
            }

            if (value.__type__) {
                let out = {
                    type: '@@' + value.__type__ + '@@'
                } as any
                //one liner
                if (isOneLiner(value)) {
                    return out.type
                }
                if (value.enum) out.enum = value.enum
                if (value.required) out.required = value.required
                return out
            }

            if (value.__reference__) {
                let out = {
                    type: '@@' + value.__reference__ + '@@'
                } as any
                //one liner
                if (isOneLiner(value)) {
                    return out.type
                }
                if (value.enum) out.enum = value.enum
                if (value.required) out.required = value.required
                return out
            }

            if (value.__array__) {
                return [value.__array__]
            }

            return value
        }, 2)

        let replaced = stringified.replace(/"@@(.*?)@@"/g, "$1")
        if (extend.length) {
            replaced = `Object.assign({}, ${extend.join(',')}, ${replaced} )`
        }

        out += 'var ' + key + ' = ' + replaced + '\n\n'
    })

    fs.writeFileSync('../test/test.ts', out)

}

/*
const defs = require('../test/test.json')

mongoose(defs).then(() => {
    console.log('end')
})
*/


/*
merge(defs, {
    hideComments: true,
    paths: true
}).then(() => {
    console.log('end')
})*/