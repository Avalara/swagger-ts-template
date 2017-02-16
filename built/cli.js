#!/usr/bin/env node
"use strict";
const yargs = require("yargs");
const path = require("path");
const generator = require("./main");
const fs = require("fs");
const pkg = require('../package.json');
console.log('Version', pkg.version);
yargs.usage('Usage: tstemplate <source.json> [<dest.d.ts>]')
    .demand(1)
    .describe('c', 'Does not include doc comments')
    .describe('e', 'Generates an external module')
    .describe('root', 'Specify a definition root (defaults to -definitions-)');
let [source, dest] = yargs.argv._;
dest = dest || path.parse(source).name + '.d.ts';
fs.readFile(path.resolve(source), (err, buffer) => {
    if (err)
        throw err;
    var parsed;
    try {
        parsed = JSON.parse(buffer.toString());
    }
    catch (e) {
        console.error('Failed parsing the source json file.');
        process.exit(1);
    }
    generator.merge(parsed, {
        hideComments: yargs.argv.c !== undefined,
        external: yargs.argv.e !== undefined,
        filename: dest,
        searchWithin: yargs.argv.root || 'definitions'
    }).then(() => console.log('Great Success!!'))
        .catch(console.error);
});
