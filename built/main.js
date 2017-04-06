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
/*
const defs = require('../test/test.json')

merge(defs, {
    hideComments: true,
    paths: true
}).then(() => {
    console.log('end')
})
*/ 
//# sourceMappingURL=main.js.map