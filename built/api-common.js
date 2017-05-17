"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function paramBuilder(operation, opts) {
    let form = {
        verb: String(operation.verb).toUpperCase(),
        url: '/api' + operation.path,
        query: {},
        body: {},
        headers: {}
    };
    operation.parameters.forEach(param => {
        let value = opts[param.name];
        if (!value)
            return;
        switch (param.type) {
            case 'path':
                let rgx = new RegExp('\{' + name + '\}');
                form.url = form.url.replace(rgx, encodeURIComponent(value));
                break;
            case 'body':
                form.body = value;
                break;
            //leave encoding to the sender fn
            case 'query':
            case 'header':
                form[param.type][param.name] = value;
                break;
        }
    });
    return form;
}
exports.paramBuilder = paramBuilder;
let __reqHandler = () => __awaiter(this, void 0, void 0, function* () { });
exports.requestHandler = () => __reqHandler;
exports.setRequestHandler = (handler) => {
    __reqHandler = handler;
};
exports.requestMaker = operation => (params, other) => {
    let paramBuild = paramBuilder(operation, Object.assign({}, params));
    return exports.requestHandler(other)(paramBuild);
};
