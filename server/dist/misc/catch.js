import { errors } from "./errors.js";
export const catchError = async (func, params) => {
    let val = await func(params).then((x) => {
        if ("message" in x) {
            let obj = { code: 400, message: "undefined error" };
            Object.keys(errors).forEach(error => {
                if (x.message.indexOf(error) !== -1) {
                    //@ts-ignore
                    obj = { code: errors[error].code, message: errors[error].message };
                }
            });
            console.error(x.message);
            return obj;
        }
        else {
            console.log(x);
            let obj = { code: 200, message: JSON.stringify(x) ?? undefined };
            return obj;
        }
    });
    return val;
};
//# sourceMappingURL=catch.js.map