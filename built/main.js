"use strict";
var _ = require('lodash');
var wordwrap = require('word-wrap');
function merge(swg, opts) {
    if (opts === void 0) { opts = {}; }
    var out = '';
    var external = opts.external ? 'export ' : '';
    for (var name_1 in swg.definitions) {
        //if (name !== 'PurchaseHeaderIn') continue
        var def = swg.definitions[name_1];
        var templ = typeTemplate(def, 4, false);
        out += "\n" + external + "type " + name_1 + " = {\n" + templ.join('\n') + "\n}\n";
    }
    return out;
    function typeTemplate(swaggerType, indent, embraceObjects) {
        if (indent === void 0) { indent = 0; }
        if (embraceObjects === void 0) { embraceObjects = false; }
        function wrap() {
            if (swaggerType.$ref) {
                var split = swaggerType.$ref.split('/');
                return [split[split.length - 1]];
            }
            if (swaggerType.enum) {
                var typestr = swaggerType.enum.reduce(function (bef, curr) {
                    if (typeof curr === 'string')
                        curr = "'" + curr + "'";
                    if (bef)
                        bef += '|';
                    bef += String(curr);
                    return bef;
                }, '');
                var wrapped = wrapLiteral(typestr);
                return wrapped;
            }
            if (~['integer', 'double', 'number'].indexOf(swaggerType.type)) {
                return ['number'];
            }
            if (~['string', 'boolean'].indexOf(swaggerType.type)) {
                return [swaggerType.type];
            }
            if (swaggerType.type === 'object' || swaggerType.properties) {
                var aux = _.toPairs(swaggerType.properties).map(function (pair) {
                    var _a = pair, key = _a[0], prop = _a[1];
                    var current = typeTemplate(prop, indent, true);
                    var required = (swaggerType.required && swaggerType.required.indexOf(key) != -1) ?
                        '' : '?';
                    current[0] = "" + key + required + " : " + current[0].trim();
                    if (prop.description && !opts.hideComments) {
                        var doc = [
                            '/**'
                        ].concat(wordwrap(prop.description, { width: 60 })
                            .split('\n').map(function (s) { return (" *  " + s.trim()); }), [
                            ' */'
                        ]);
                        current = doc.concat(current);
                    }
                    return current;
                });
                var joined = aux.reduce(function (bef, curr) { return bef.concat(curr); }, []);
                if (embraceObjects) {
                    //one-liner
                    if (joined.length === 1) {
                        joined[0] = "{ " + aux[0] + " }";
                    }
                    else {
                        joined.unshift('{');
                        joined.push('}');
                    }
                }
                return joined;
            }
            if (swaggerType.type === 'array') {
                var inner = typeTemplate(swaggerType.items, 0, true);
                inner[inner.length - 1] += '[]';
                return inner;
            }
            throw swaggerType.type;
        }
        return wrap().map(function (ln) { return _.repeat(' ', indent) + ln; });
    }
}
exports.merge = merge;
function wrapLiteral(inp) {
    var items = inp.split('|');
    var allLines = [];
    var currentLine = '';
    items.forEach(function (i) {
        currentLine += i + '|';
        if (currentLine.length > 40) {
            allLines.push(currentLine);
            currentLine = '';
        }
    });
    if (currentLine) {
        allLines.push(currentLine);
    }
    var last = allLines[allLines.length - 1];
    last = last.substr(0, last.length - 1);
    allLines[allLines.length - 1] = last;
    return allLines;
}
