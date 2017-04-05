"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let verbs = ['get', 'put', 'post', 'delete'];
module.exports = function (doc, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        let out = '';
        //shallow
        Object.keys(doc.paths).map(pathKey => {
            let path = doc.paths[pathKey];
            let responsesInner = '';
            Object.keys(path).forEach((verbKey) => {
                if (verbs.indexOf(verbKey) === -1 || !path[verbKey])
                    return;
                let responses = path[verbKey].responses;
                Object.keys(responses).forEach(statusCodeKey => {
                    let schema = responses[statusCodeKey].schema;
                    if (!schema)
                        return;
                });
            });
            out += `'${pathKey}' = { responses : \n ${responsesInner} \n }`;
        });
        let wrap = `
    export namespace Paths {
        ${out}
    }
    `;
    });
};
