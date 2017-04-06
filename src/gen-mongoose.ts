import _ = require('lodash')

type Reference = { __reference__ : string }
const Reference = str => ({ __reference__ : str })

type TypesEnum = 'String' | 'Number' | 'Boolean'
type Type = { __type__: TypesEnum, enum?: any[] }
const Type = (str:TypesEnum, en?) => ({ __type__ : str, enum : en })

type Arr = { __array__: Type|Reference }
const Arr = (any) => ({ __array__ : any  })

type MongooseType = { required? : boolean } & (Type | Reference | Arr)


export function run(__doc) {
    const $definitionRoot = 'definitions'

    if (!Object.keys(__doc[$definitionRoot] || {}).length) {
        throw Error('No definition found in ' + $definitionRoot)
    }
    let out = _.toPairs(__doc[$definitionRoot]).reduce( (out, [key, val]) => {
        out[key] = typeTemplate(val)
        return out
    }, {})
        

    return out
}

export function typeTemplate(swaggerType: SwaggerType) : MongooseType {

    if (swaggerType.$ref) {
        let split = swaggerType.$ref.split('/')
        return Reference(split[split.length - 1])
    }

    if (swaggerType.enum) {
        return Type('String', swaggerType.enum)
    }

    if (~['integer', 'double', 'number'].indexOf(swaggerType.type)) {
        return Type('Number')
    }

    if (~['string', 'boolean'].indexOf(swaggerType.type)) {
        return swaggerType.type === 'string' ? Type('String') : Type('Boolean')
    }


    if (swaggerType.type === 'object' || swaggerType.properties) {
        let merged = _.toPairs(swaggerType.properties).reduce((out, [key, prop]) => {
            let required = (swaggerType.required && swaggerType.required.indexOf(key) != -1)                
            let inner = typeTemplate(prop)
            out[key] = inner
            if (required) out[key].required = true
            return out
        }, {} as any)
        return merged
    }

    if (swaggerType.type === 'array') {
        let inner = typeTemplate(swaggerType.items)
        return Arr(inner)
    }

    if (swaggerType.allOf) {
        let merged = mergeAllof(swaggerType)
        let data = typeTemplate(merged.swaggerDoc)
        return data
    }

    if (swaggerType.anyOf) {
        let merged = mergeAllof(swaggerType, 'anyOf')
        let data = typeTemplate(merged.swaggerDoc)
        return data
    }

    if (swaggerType.type === 'file') {
        return Type('String')
    }

    throw swaggerType.type        

}


function mergeAllof(swaggerType: SwaggerType, key: 'allOf' | 'anyOf' = 'allOf') {
    let item = swaggerType[key]
    if (!item) throw Error('wrong mergeAllOf call.')
    var extend = [] as any[];
    let merged = item.reduce((prev, toMerge) => {
        let refd: SwaggerType
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
            refd = toMerge
        //}
        if (refd.allOf) refd = mergeAllof(refd, 'allOf').swaggerDoc
        else if (refd.anyOf) refd = mergeAllof(refd, 'anyOf').swaggerDoc
        if (!refd.properties) {
            console.error('allOf merge: unsupported object type at ' + JSON.stringify(toMerge))
        }
        for (var it in <any>refd.properties) {
            //if ((<any>prev).properties[it]) console.error('property', it, 'overwritten in ', JSON.stringify(toMerge).substr(0,80));
            ; (<any>prev).properties[it] = (<any>refd).properties[it]
        }
        return prev
    }, { type: 'object', properties: {} })
    return { swaggerDoc: merged, extends: extend }
}