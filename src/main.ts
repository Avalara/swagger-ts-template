import genTypedefs = require('./gen-typedefs')
import genPaths = require('./gen-paths')


export async function merge(swaggerDoc, opts : mergeOpts = {}) {
    try {
        await genTypedefs( swaggerDoc, opts ).run()
        if (opts.paths) await genPaths(swaggerDoc, opts)
    } catch(err) {
        console.log(err)
        throw err
    }
}


/*
const defs = require('../test/test.json')

merge(defs, {
    hideComments: true,
    paths: true
}).then(() => {
    console.log('end')
})
*/