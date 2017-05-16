const tstemplate = require('../built/main')
const defs = require('./test.json')

/*
tstemplate.genTypes( defs, {
    external : true,
    hideComments: true
})
*/


tstemplate.genPaths( defs ).then(() => console.log('ended paths test'))