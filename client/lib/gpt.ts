
export const getGPT = async (notes: string) => {

    const req = await fetch("http://localhost:4000/gpt",
        {
            body: JSON.stringify({"notes": notes}),
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