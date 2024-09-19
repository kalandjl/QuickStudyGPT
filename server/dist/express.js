import express from "express";
import cors from "cors";
import { doGPT } from "./gpt.js";
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));
const port = 4000;
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000"
    });
    next();
});
app.post('/gpt', async (req, res) => {
    console.log(req.body);
    if (!req.body)
        return res.status(404).send("No prompt");
    const gptres = (await doGPT(req.body.notes))?.choices[0];
    if (gptres) {
        console.log(gptres);
        return res.status(200).send(gptres);
    }
    return res.status(400).send("failure to gpt :(");
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=express.js.map