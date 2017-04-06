type SwaggerDoc = {
    swagger: string //version
    info: any
    host: string
    'x-swagger-namespace': string
    schemes: string[]
    produces: string
    basepath?: string
    paths: SwaggerPaths
    parameters: any
    responses: any
    //definitions: { [name:string] : SwaggerType }
}

interface SwaggerPaths {
    [path: string]: {
        [verb in SomeVerbs]: {
            responses: {
                [statuscode: number]: {
                    schema : SwaggerType
                }
            }
        }
    }
}

type SomeVerbs = 'get'|'post'|'put'|'delete'

type SwaggerType = {
    type: string
    description?: string
    maxLength?: number
    $ref?: string
    format?: string
    enum?: (string | number)[]
    properties?: { [name: string]: SwaggerType }
    items?: any
    allOf?: SwaggerType[]
    anyOf?: SwaggerType[]
    required?: string[]
}

interface mergeOpts {
    ambient? : any
    filename?: string
    hideComments?: boolean
    //search for type definitions in the following path (currently only 1 item)
    searchWithin?: string
    paths?: boolean
}