import OpenAI from "openai"
import * as dotenv from 'dotenv'
dotenv.config({path: "./res/.env"});

// Access the OpenAI API key from process.env
const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({apiKey: apiKey})

export const doGPT = async (notes: string) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: `Make 10 hard questions based off of these notes, and formate the questions such as ["question 1", "question 2",]. I should be able to run JSON.parse on the raw response without error: "${notes}"`,
            },
        ],
    })

    return completion
}

