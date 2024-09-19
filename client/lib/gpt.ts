
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