const tstemplate = require('../built/main')
const defs = require('./test.json')

tstemplate.merge( defs, {
    external : true,
    hideComments: true
})