import { errors } from "./errors.ts";
import { CatchResObj, ErrorObject, UserObj } from "../types/types.ts"

interface A{
    member:string;
}


export const catchError = async (func: (params: any) => Promise<ErrorObject | UserObj | any>, params: any): Promise<CatchResObj> => {

    let val = await func(params).then((x) => {

        
        if("message" in x) {

            let obj: CatchResObj = {code: 400, message: "undefined error"}

            Object.keys(errors).forEach(error => {
                if (x.message.indexOf(error) !== -1) {
                    //@ts-ignore
                    obj = {code: errors[error].code, message: errors[error].message}
                }
            })
            return obj
        } else {
            let obj: CatchResObj = {code: 200, message: JSON.stringify(x) ?? undefined}
            return obj
        }
    })

    return val
}