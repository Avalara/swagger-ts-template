const tstemplate = require('../built/main')
const defs = require('./test.json')

tstemplate.merge( defs, {
    hideComments: true,
    paths : true
})

console.log('end')