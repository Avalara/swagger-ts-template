"use strict";
const _ = require("lodash");
const Reference = str => ({ __reference__: str });
const Type = (str, en) => ({ __type__: str, enum: en });
const Arr = (any) => ({ __array__: any });
function run(__doc) {
    const $definitionRoot = 'definitions';
    if (!Object.keys(__doc[$definitionRoot] || {}).length) {
        throw Error('No definition found in ' + $definitionRoot);
    }
    let out = _.toPairs(__doc[$definitionRoot]).reduce((out, [key, val]) => {
        out[key] = typeTemplate(val);
        return out;
    }, {});
    return out;
}
exports.run = run;
function typeTemplate(swaggerType) {
    if (swaggerType.$ref) {
        let split = swaggerType.$ref.split('/');
        return Reference(split[split.length - 1]);
    }
    if (swaggerType.enum) {
        return Type('String', swaggerType.enum);
    }
    if (~['integer', 'double', 'number'].indexOf(swaggerType.type)) {
        return Type('Number');
    }
    if (~['string', 'boolean'].indexOf(swaggerType.type)) {
        return swaggerType.type === 'string' ? Type('String') : Type('Boolean');
    }
    if (swaggerType.type === 'object' || swaggerType.properties) {
        let merged = _.toPairs(swaggerType.properties).reduce((out, [key, prop]) => {
            let required = (swaggerType.required && swaggerType.required.indexOf(key) != -1);
            let inner = typeTemplate(prop);
            out[key] = inner;
            if (required)
                out[key].required = true;
            return out;
        }, {});
        return merged;
    }
    if (swaggerType.type === 'array') {
        let inner = typeTemplate(swaggerType.items);
        return Arr(inner);
    }
    if (swaggerType.allOf) {
        let merged = mergeAllof(swaggerType);
        let data = typeTemplate(merged.swaggerDoc);
        return data;
    }
    if (swaggerType.anyOf) {
        let merged = mergeAllof(swaggerType, 'anyOf');
        let data = typeTemplate(merged.swaggerDoc);
        return data;
    }
    if (swaggerType.type === 'file') {
        return Type('String');
    }
    throw swaggerType.type;
}
exports.typeTemplate = typeTemplate;
function mergeAllof(swaggerType, key = 'allOf') {
    let item = swaggerType[key];
    if (!item)
        throw Error('wrong mergeAllOf call.');
    var extend = [];
    let merged = item.reduce((prev, toMerge) => {
        let refd;
        /*
        if (toMerge.$ref) {
            let split = toMerge.$ref.split('/')
            if (split[0] === '#' && split[1] === $definitionRoot && split.length === 3) {
                extend.push(split[2])
                return prev
            }
            refd = findDef(__doc, split)
        }
        else {
        */
        refd = toMerge;
        //}
        if (refd.allOf)
            refd = mergeAllof(refd, 'allOf').swaggerDoc;
        else if (refd.anyOf)
            refd = mergeAllof(refd, 'anyOf').swaggerDoc;
        if (!refd.properties) {
            console.error('allOf merge: unsupported object type at ' + JSON.stringify(toMerge));
        }
        for (var it in refd.properties) {
            //if ((<any>prev).properties[it]) console.error('property', it, 'overwritten in ', JSON.stringify(toMerge).substr(0,80));
            ;
            prev.properties[it] = refd.properties[it];
        }
        return prev;
    }, { type: 'object', properties: {} });
    return { swaggerDoc: merged, extends: extend };
}
//# sourceMappingURL=gen-mongoose.js.map