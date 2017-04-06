"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const genTypedefs = require("./gen-typedefs");
const genPaths = require("./gen-paths");
const genMongo = require("./gen-mongoose");
const fs = require("fs");
function merge(swaggerDoc, opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield genTypedefs(swaggerDoc, opts).run();
            if (opts.paths)
                yield genPaths(swaggerDoc, opts);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.merge = merge;
function mongoose(swaggerDoc) {
    return __awaiter(this, void 0, void 0, function* () {
        var source = genMongo.run(swaggerDoc);
        function isOneLiner(obj) {
            return Object.keys(obj).filter(key => {
                let item = obj[key];
                if (item === undefined)
                    return false;
                return true;
            }).length === 1;
        }
        var out = '';
        Object.keys(source).forEach(key => {
            var item = source[key];
            var stringified = JSON.stringify(item, (key, value) => {
                if (value.__type__) {
                    let out = {
                        type: '@@' + value.__type__ + '@@'
                    };
                    //one liner
                    if (isOneLiner(value)) {
                        return out.type;
                    }
                    if (value.enum)
                        out.enum = value.enum;
                    if (value.required)
                        out.required = value.required;
                    return out;
                }
                if (value.__reference__) {
                    let out = {
                        type: '@@' + value.__reference__ + '@@'
                    };
                    //one liner
                    if (isOneLiner(value)) {
                        return out.type;
                    }
                    if (value.enum)
                        out.enum = value.enum;
                    if (value.required)
                        out.required = value.required;
                    return out;
                }
                if (value.__array__) {
                    return [value.__array__];
                }
                return value;
            }, 2);
            let replaced = stringified.replace(/"@@(.*?)@@"/g, "$1");
            out += 'var ' + key + ' = ' + replaced + '\n\n';
        });
        fs.writeFileSync('../test/test.ts', out);
    });
}
exports.mongoose = mongoose;
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
//# sourceMappingURL=main.js.map