import OpenAI from "openai";
import * as dotenv from 'dotenv';
dotenv.config();
// Access the OpenAI API key from process.env
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });
export const doGPT = async (notes) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: `Summarize these notes: "${notes}"`,
            },
        ],
    });
    return completion;
};
//# sourceMappingURL=gpt.js.map