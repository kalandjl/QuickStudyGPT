import OpenAI from "openai";
import * as dotenv from 'dotenv';
dotenv.config({ path: "./res/.env" });
// Access the OpenAI API key from process.env
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });
export const getQuestions = async (notes, questions) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { "role": "user", "content": "Give me an example of a helpful fill in the blank question" },
            { "role": "assistant", "content": "The _______ is the _______ of the cell." },
            { "role": "user", "content": "ONLY ONE BLANK, and that question doesn't have enought context to answer" },
            { "role": "assistant", "content": "The mitochondria is the _______ of the cell." },
            {
                role: "user",
                content: `That's perfect. Make SINGLE FILL IN THE BLANK (ONLY ONE FILL IN THE BLANK) questions 
                based off the CONTENT of some notes
                , and formate the questions such as {"1": {question: "", answer: ""}}. 
                I should be able to run JSON.parse() in javascript on the raw response without error. Remember, 
                no written response questions, just fill in the blanks. If you use a question mark,
                it's not right. REMEMBER DON"T ADD ANY EXTRA CONTEXT, JUST THE QUOTES IN JSON FORM!!!!!`,
            },
            { "role": "assistant", "content": "Ok, give me the notes, difficulty level, and number of questions please." },
            { "role": "user", "content": `Notes: ${notes}, Difficulty: normal, Number of questions: ${questions}` },
        ],
    });
    return completion;
};
export const generateExtraQuestions = async (notes, prev) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { "role": "user", "content": "Give me an example of a helpful fill in the blank question" },
            { "role": "assistant", "content": "The _______ is the _______ of the cell." },
            { "role": "user", "content": "ONLY ONE BLANK, and that question doesn't have enought context to answer" },
            { "role": "assistant", "content": "The mitochondria is the _______ of the cell." },
            {
                role: "user",
                content: `That's perfect. Make 10 SINGLE FILL IN THE BLANK (ONLY ONE FILL IN THE BLANK) questions based off the CONTENT of these notes:
                "${notes}", and formate the questions such as {"1": {question: "", answer: ""}}. 
                I should be able to run JSON.parse() on the raw response without error. Remember, 
                no written response questions, just fill in the blanks. If you use a question mark,
                it's not right.`,
            },
            { "role": "assistant", "content": JSON.stringify(prev) },
            { "role": "user", "content": "Now make 10 NEW QUESTIONS with the same format. Use the next number though. Eg: 11, 12, 13" },
        ],
    });
    return completion;
};
// export const correctAnswers = async (notes: string, answers: string[], questions: string[]) => {
//     const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//             { role: "system", content: "You are a helpful assistant." },
//             {
//                 role: "user",
//                 content: `Given these notes: ${notes}, 
//                 mark these answers to ALL ${questions.length} of the questions you provided: "${answers.map((answer, i) => `${questions[i]}: ${answer}`)}" 
//                 Make sure to respond in a format that follows this template: 
//                 "{"number": {
//                     "question": "question_name",
//                     "correct": "weather my answer was right or not, in boolean form", 
//                     "critique": "Why was my question not perfect?"
//                     }
//                 }". 
//                 I need your raw response to be parsable, so don't add in unneeded text.`,
//             },
//         ],
//     })
//     return completion
// }
//# sourceMappingURL=gpt.js.map