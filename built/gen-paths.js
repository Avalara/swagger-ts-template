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
const formatter = require("typescript-formatter");
let verbs = ['get', 'put', 'post', 'delete'];
module.exports = function (doc, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        let $typesParser = genTypedefs(doc, opts);
        const $filename = opts.filename || 'paths_' + Math.ceil(Math.random() * 10000) + '.d.ts';
        let out = '';
        //shallow
        Object.keys(doc.paths).map(pathKey => {
            let path = doc.paths[pathKey];
            let rgx = /^\{(.*)\}$/;
            Object.keys(path).forEach((verbKey) => {
                let responsesInner = '';
                if (verbs.indexOf(verbKey) === -1 || !path[verbKey])
                    return;
                let responses = path[verbKey].responses;
                Object.keys(responses).forEach((statusCodeKey) => {
                    let schema = responses[statusCodeKey].schema;
                    if (!schema)
                        return;
                    let parse = $typesParser.fromSwaggerType(schema, 'response' + statusCodeKey);
                    responsesInner += parse + '\n';
                    let nsname = pathKey.split('/').map(item => {
                        if (rgx.test(item))
                            item = item.replace(rgx, '_$1_');
                        item = item.replace(/[^a-z|A-Z|0-9]+/g, '_');
                        return item;
                    })
                        .filter(Boolean)
                        .concat([verbKey])
                        .join('.');
                    out += `export namespace ${nsname} { \n ${responsesInner} \n }\n\n`;
                });
            });
        });
        let result = yield formatter.processString($filename, out, {
            editorconfig: false,
            replace: true,
            tsconfig: false,
            tsfmt: false,
            tslint: false,
            verify: false
        });
        return result.dest;
    });
};
//# sourceMappingURL=gen-paths.js.map