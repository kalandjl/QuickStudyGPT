export const ConvertKeysToLowerCase = (obj: {[x: string]: any}) => {

    let output: {[x: string]: any} = {}

    Object.keys(obj).forEach((key) => {

        output[key.toLocaleLowerCase()] = obj[key]
    })

    return output
}