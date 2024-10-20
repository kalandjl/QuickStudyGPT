import setContent from "./types/setContent"
import setDoc from "./types/setDoc"

export const createSet = async (
    data: {
        notes: string, 
        title: string, 
        uid: string, 
        content: setContent, 
        initialFolder: string,
        fullyLoaded: boolean
    }, accessToken: string
): Promise<string> => {

    // @ts-ignore
    const res: {insertedId: string} = await (await fetch(`http://localhost:4000/db/create/set`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", // Set the Content-Type header
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            data: data
        })
    })).json()

    return res.insertedId
}


export const getSet = async (query: {[x: string]: any}, accessToken: string): Promise<setDoc> => {

    // @ts-ignore
    const res: setDoc = await (await fetch(`http://localhost:4000/db/get/set`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", // Set the Content-Type header
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            query: query
        })
    })).json()

    return res
}