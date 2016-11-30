#!/usr/bin/env node

import yargs = require('yargs')
yargs.usage('Usage: tstemplate <source.json> [<dest.d.ts>]')
    .demand(1)
    //.demand(2)
    .describe('c', 'Does not include doc comments')
    .describe('e', 'Generates an external module')

let [source, dest] = yargs.argv._
dest = dest ||require('path').parse(source).name + '.d.ts'

import generator = require('./main')
import fs = require('fs')
import path = require('path')

fs.readFile( path.resolve(source), (err,buffer) => {
    if (err) throw err;
    var parsed
    try {
        parsed = JSON.parse(buffer.toString())
    } catch(e) {
        console.error('Failed parsing the source json file.')
        process.exit(1)
    }

    let outp = generator.merge(parsed, {
        hideComments : yargs.argv.c !== undefined ,
        external : yargs.argv.e !== undefined
    })
    fs.writeFile( path.resolve(dest) , outp , err => {
        if (err) throw err
        console.log('Success')
    })

})
