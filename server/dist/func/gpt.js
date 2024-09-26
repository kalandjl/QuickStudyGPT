import OpenAI from "openai";
import * as dotenv from 'dotenv';
dotenv.config({ path: "./res/.env" });
// Access the OpenAI API key from process.env
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });
export const getQuestions = async (notes) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { "role": "user", "content": "Give me an example of a helpful fill in the blank question" },
            { "role": "assistant", "content": "The _______ is the _______ of the cell." },
            { "role": "user", "content": "I only want one blank, and that question doesn't have enought context" },
            { "role": "assistant", "content": "The mitochondria is the _______ of the cell." },
            {
                role: "user",
                content: `Make 10 SINGLE FILL IN THE BLANK questions based off the CONTENT of these notes:
                "${notes}", and formate the questions such as {"1": {question: "", answer: ""}}. 
                I should be able to run JSON.parse() on the raw response without error. Remember, 
                no written response questions, just fill in the blanks. If you use a question mark,
                it's not right.`,
            },
        ],
    });
    return completion;
};
export const correctAnswers = async (notes, answers, questions) => {
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
    });
    return completion;
};
//# sourceMappingURL=gpt.js.map