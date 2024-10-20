import setContent from "./types/setContent"

export const createSet = async (
    notes: string, 
    title: string, 
    uid: string, 
    content: setContent, 
    initialFolder: string,
    fullyLoaded: boolean
): Promise<string> => {

    // @ts-ignore
    const res: {id: string} = (await fetch(`http://localhost:4000/db/create/set`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json" // Set the Content-Type header
        },
        body: JSON.stringify({
            notes: notes, 
            title: title, 
            uid: uid,
            content: content,
            initialFolder: initialFolder,
            fullyLoaded: fullyLoaded
        })
    })).json()

    return res.id
}