import genTypedefs = require('./gen-typedefs')



export async function merge(swaggerDoc, opts : mergeOpts = {}) {

    return genTypedefs( swaggerDoc, opts )

}

