
import express, { NextFunction, Request, Response } from "express"
import { correctAnswers, getQuestions } from "../func/gpt.js"
import cors from "cors"
import * as dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config()

const port = 3000

const app = express()

app.use(express.json()) // Middleware to parse JSON bodies
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));

app.use((req: Request, res: Response, next: NextFunction) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});


app.post('/gpt', async (req: Request, res: Response) => {
  
    if (!req.body) return res.status(404).send("No prompt")

    console.log("Pending gpt response")

    const gptres = (await getQuestions(req.body.notes))?.choices[0]

    console.log("Completed")

    if (gptres) {

        return res.status(200).send(gptres)
    }
    

    return res.status(400).send("failure to gpt :(")
})

app.post('/correct', async (req: Request, res: Response) => {

    if (!req.body) return res.status(404).send("No prompt")

    const gptres = (await correctAnswers(req.body.notes, req.body.answers, req.body.questions))?.choices[0]

    if (gptres) {

        return res.status(200).send(gptres)
    }
    

    return res.status(400).send("failure to gpt :(")
})

const serveApi = () => {app.listen(port, () => {console.log(`Api served on port ${port}`)})}

export default serveApi