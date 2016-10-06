#!/usr/bin/env node
"use strict";
var yargs = require('yargs');
yargs.usage('Usage: tscodegen <source.json> <dest.d.ts>')
    .demand(1)
    .demand(2)
    .describe('c', 'Does not include doc comments')
    .describe('e', 'Generates an external module');
var _a = yargs.argv._, source = _a[0], dest = _a[1];
var generator = require('./main');
var fs = require('fs');
var path = require('path');
fs.readFile(path.resolve(source), function (err, buffer) {
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
    var outp = generator.merge(parsed, {
        hideComments: yargs.argv.c !== undefined,
        external: yargs.argv.e !== undefined
    });
    fs.writeFile(path.resolve(dest), outp, function (err) {
        if (err)
            throw err;
        console.log('Success');
    });
});
