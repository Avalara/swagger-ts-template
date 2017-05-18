declare global {
    namespace GApiCommon {
        //for declaration augmenting
        interface RequestHandlerOpts { }
    }
}

export type RequestHandler_t =
    <T>(reqHandlerOpts?: GApiCommon.RequestHandlerOpts) => (payload: ReqHandlerPayload_t) => Promise<T>

export interface ReqHandlerPayload_t {
    verb?: string
    url: string
    query?: any
    body?: any
    headers?: any
}

export interface Operation_t {
    path: string
    verb: string
    parameters: {
        name: string
        in: string
        required?: boolean
    }[]
}

type RequestMaker_t = 
    <Params, Response>(o:Operation_t) => (params: Params, reqHandlerOpts? : GApiCommon.RequestHandlerOpts) => Promise<Response>




let __reqHandler: RequestHandler_t = () => async () => 0

export const setRequestHandler
    : (handler: RequestHandler_t) => void
    = (handler) => {
        __reqHandler = handler
    }


export function paramBuilder(operation: Operation_t, data: any): ReqHandlerPayload_t {
    let form = {
        verb: String(operation.verb).toUpperCase(),
        url: '/api' + operation.path,
        query: {} as any,
        body: {} as any,
        headers: {} as any
    }
    operation.parameters.forEach(param => {
        let value = data[param.name]
        if (!value) return
        switch (param.in) {
            case 'path':
                let rgx = new RegExp('\{' + name + '\}')
                form.url = form.url.replace(rgx, encodeURIComponent(value))
                break;
            case 'body':
                form.body = value
                break
            //leave encoding to the sender fn
            case 'query':
            case 'header':
                form[param.in][param.name] = value
                break;
        }
    })

    return form
}


export const requestMaker
    : RequestMaker_t
    = operation => (data, senderOpts) => {
        let payload = paramBuilder(operation, { ...data })
        return __reqHandler(senderOpts)(payload)      
    }