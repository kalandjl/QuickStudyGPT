import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const getGPT = async (body: {notes: string, prev?: string, questions: number}, op: string) => {

    const req = await fetch(`http://localhost:4000/api/gpt-${op}`,
        {
            body: JSON.stringify(body),
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Set the Content-Type header
            },
        }
    )

    if (req.ok) {

        const body = await req.json(); 
        
        return body// Await the response to be converted to JSON
    } else {
        console.error('Error:', req.statusText);
    }

    return null
}

export const getGPTInitial = async (notes: string, uid: string, questions: number, title?: string, folder?: string): Promise<string | undefined> => {

    // Get gpt response from server at /gpt-initial
    const res = await getGPT({notes: notes, questions: questions}, 'initial')

    // Clean up AI response
    const mes =  JSON.stringify(res.message.content)

    // Use regex to make GPT response parsable
    let cleanedMes = mes
        .replace("json", "")
        .replace(/\\n/g, '')      
        .replace(/\\\"/g, '"')       
        .replace(/^\s+/g, '')  
        .replace(/\s+$/g, '') 
        .replace(/\\/g, '')      
        .replace(/^"+|"+$/g, '')
        .replace(/```/g, '');


    // Error catching
    try {

        JSON.parse(cleanedMes)
    } catch (e) {

        return
    }

    // Create firestore set doc
    const doc = await addDoc(collection(firestore, "/sets"), {
        "uid": uid,
        "title": title ?? "title",
        "notes": notes,
        "content": JSON.parse(cleanedMes),
        "initialFolder": folder ?? "default",
        "fullyLoaded": false
    })

    return doc.id
}

export const generateGPT = async (notes: string, id: string): Promise<void> => {

    const content = await (await getDoc(doc(firestore, `/sets/${id}`))).data()?.content
    
    const res = await getGPT({notes: notes, prev: content, questions: 10}, 'gen')

    const mes =  JSON.stringify(res.message.content)


    // Use regex to make GPT response parsable
    let cleanedMes = mes
        .replace("json", "")
        .replace(/\\n/g, '')      
        .replace(/\\\"/g, '"')       
        .replace(/^\s+/g, '')  
        .replace(/\s+$/g, '') 
        .replace(/\\/g, '')      
        .replace(/^"+|"+$/g, '')
        .replace(/```/g, '');

    try {

        JSON.parse(cleanedMes)
    } catch (e) {

        return 
    }

    if (!content) return

    updateDoc(doc(firestore, `/sets/${id}`), {
        "content": {...content, ...JSON.parse(cleanedMes)}
    })
}

export const getCorrections = async (notes: string, answers: string[], questions: string[]) => {

    const req = await fetch("http://localhost:4000/correct",
        {
            body: JSON.stringify({"notes": notes, "answers": answers, "questions": questions}),
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Set the Content-Type header
            },
        }
    )

    if (req.ok) {

        const body = await req.json(); 
        
        return body// Await the response to be converted to JSON
    } else {
        console.error('Error:', req.statusText);
    }

    return null
}