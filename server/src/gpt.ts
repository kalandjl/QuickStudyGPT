import OpenAI from "openai"
import * as dotenv from 'dotenv'
dotenv.config({path: "./res/.env"});

// Access the OpenAI API key from process.env
const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({apiKey: apiKey})

export const getQuestions = async (notes: string) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: `Make 10 questions based off the CONTENT (not just core ideas) of these: "${notes}", and formate the questions such as ["question 1", "question 2",]. I should be able to run JSON.parse on the raw response without error: "${notes}"`,
            },
        ],
    })

    return completion
}

export const correctAnswers = async (notes: string, answers: string[], questions: string[]) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: `Given these notes: ${notes}, 
                mark these answers to ALL ${questions.length} of the questions you provided: "${answers.map((answer, i) => `${questions[i]}: ${answer}`)}" 
                Make sure to respond in a format that follows this template: 
                "{"number": {
                    "question": "question_name",
                    "correct": "weather my answer was right or not, in boolean form", 
                    "critique": "Why was my question not perfect?"
                    }
                }". 
                I need your raw response to be parsable, so don't add in unneeded text.`,
            },
        ],
    })

    return completion
}
