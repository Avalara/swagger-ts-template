export type Operation = {
    path: string
    verb: string
    parameters: {
        name:string;
        type?:string;
        required?:boolean;
        in:string;
    }[]
}


export function paramBuilder(operation:Operation, opts:any) : ReqHandlerOpts {

    let form = {
        verb : String(operation.verb).toUpperCase() ,
        url: '/api' + operation.path,
        query : {} as any ,
        body : {} as any ,
        headers : {} as any
    }
    operation.parameters.forEach( param => {
        let value = opts[param.name]
        if (!value) return
        switch (param.type) {
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
                form[param.type][param.name] = value
                break;
        }
    })

    return form

}

let __reqHandler : any = async () => {}

export interface ReqHandlerOpts {
    verb?: string
    url: string
    query?: any
    body?: any
    headers?: any
}

export const requestHandler 
    : () => (opts:ReqHandlerOpts) => Promise<any>
    = () => __reqHandler

export const setRequestHandler
    : (handler : (o:ReqHandlerOpts) => Promise<any>) => void
    = (handler) => {
        __reqHandler = handler
    }