"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _ = require("lodash");
const formatter = require("typescript-formatter");
const wordwrap = require('word-wrap');
var __mainDoc;
function merge(swaggerDoc, opts = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        opts.filename = opts.filename || 'typing_' + Math.ceil(Math.random() * 10000) + '.d.ts';
        __mainDoc = swaggerDoc;
        var out = '';
        let external = opts.external ? 'export ' : '';
        for (let name in swaggerDoc.definitions) {
            //if (name !== 'PurchaseHeaderIn') continue
            let def = swaggerDoc.definitions[name];
            let templ = typeTemplate(def, 4, true);
            out += `
${external}type ${name} = 
${templ.join('\n')}

`;
        }
        console.log('dest', opts.filename);
        let result = yield formatter.processString(opts.filename, out, {
            editorconfig: false,
            replace: true,
            tsconfig: false,
            tsfmt: false,
            tslint: false,
            verify: false
        });
        return result.dest;
        function typeTemplate(swaggerType, indent = 0, embraceObjects = false) {
            function wrap() {
                if (swaggerType.$ref) {
                    let split = swaggerType.$ref.split('/');
                    return [split[split.length - 1]];
                }
                if (swaggerType.enum) {
                    let typestr = swaggerType.enum.reduce((bef, curr) => {
                        if (typeof curr === 'string')
                            curr = `'${curr}'`;
                        if (bef)
                            bef += '|';
                        bef += String(curr);
                        return bef;
                    }, '');
                    let wrapped = wrapLiteral(typestr);
                    return wrapped;
                }
                if (~['integer', 'double', 'number'].indexOf(swaggerType.type)) {
                    return ['number'];
                }
                if (~['string', 'boolean'].indexOf(swaggerType.type)) {
                    return [swaggerType.type];
                }
                if (swaggerType.type === 'object' || swaggerType.properties) {
                    let aux = _.toPairs(swaggerType.properties).map(pair => {
                        var [key, prop] = pair;
                        let current = typeTemplate(prop, indent, true);
                        let required = (swaggerType.required && swaggerType.required.indexOf(key) != -1) ?
                            '' : '?';
                        current[0] = `${key}${required} : ${current[0].trim()}`;
                        if (prop.description && !opts.hideComments) {
                            var doc = [
                                '/**',
                                ...wordwrap(prop.description, { width: 60 })
                                    .split('\n').map(s => ` *  ${s.trim()}`),
                                ' */'
                            ];
                            current = [...doc, ...current];
                        }
                        return current;
                    });
                    let joined = aux.reduce((bef, curr) => [...bef, ...curr], []);
                    if (embraceObjects) {
                        //one-liner
                        if (joined.length === 1) {
                            joined[0] = `{ ${aux[0]} }`;
                        }
                        else {
                            joined.unshift('{');
                            joined.push('}');
                        }
                    }
                    return joined;
                }
                if (swaggerType.type === 'array') {
                    let inner = typeTemplate(swaggerType.items, 0, true);
                    inner[inner.length - 1] += '[]';
                    return inner;
                }
                if (swaggerType.allOf) {
                    let merged = mergeAllof(swaggerType);
                    return ['{', ...typeTemplate(merged), '}'];
                }
                if (swaggerType.anyOf) {
                    let merged = mergeAllof(swaggerType, 'anyOf');
                    return ['{', ...typeTemplate(merged), '}'];
                }
                throw swaggerType.type;
            }
            return wrap().map(ln => _.repeat(' ', indent) + ln);
        }
    });
}
exports.merge = merge;
function mergeAllof(swaggerType, key = 'allOf') {
    let item = swaggerType[key];
    if (!item)
        throw Error('wrong mergeAllOf call.');
    let merged = item.reduce((prev, toMerge) => {
        let refd;
        if (toMerge.$ref) {
            refd = findDef(__mainDoc, toMerge.$ref.split('/'));
        }
        else {
            refd = toMerge;
        }
        if (refd.allOf)
            refd = mergeAllof(refd, 'allOf');
        else if (refd.anyOf)
            refd = mergeAllof(refd, 'anyOf');
        if (!refd.properties) {
            console.error('allOf merge: unsupported object type at ' + JSON.stringify(toMerge));
        }
        for (var it in refd.properties) {
            if (prev.properties[it])
                console.error('property', it, 'overwritten in ', JSON.stringify(toMerge).substr(0, 80));
            prev.properties[it] = refd.properties[it];
        }
        return prev;
    }, { type: 'object', properties: {} });
    return merged;
}
function findDef(src, path) {
    if (path[0] == '#')
        path = path.slice(1);
    if (!path.length)
        return src;
    return findDef(src[path[0]], path.slice(1));
}
function wrapLiteral(inp) {
    let items = inp.split('|');
    let allLines = [];
    let currentLine = '';
    items.forEach(i => {
        currentLine += i + '|';
        if (currentLine.length > 40) {
            allLines.push(currentLine);
            currentLine = '';
        }
    });
    if (currentLine) {
        allLines.push(currentLine);
    }
    let last = allLines[allLines.length - 1];
    last = last.substr(0, last.length - 1);
    allLines[allLines.length - 1] = last;
    return allLines;
}
