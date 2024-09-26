import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import { correctAnswers, getQuestions } from "../func/gpt.js"
import * as dotenv from 'dotenv'
import { LogInReqBody } from "../types/types.js"
import { catchError } from "../misc/catch.js"
import { verifyUser } from "../db/main.js"
import { generateAccessToken, generateRefreshToken } from "../auth/index.js"
dotenv.config()

const port = 4000

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


// Authenticate user and return token
app.post('/login', async (req: Request, res: Response) => {


    // Basic login request
    const body: LogInReqBody = req.body

    const { email, password } = body

    // Find errors
    let resObj = await catchError(verifyUser, {email: email, password: password})


    // Error parsing
    if (resObj.code !== 200) {
        return res.status(resObj.code).send(resObj.message)
    } 

    let resMessage = JSON.parse(resObj.message ?? "{uid: null}")

    if (!resMessage.uid) return res.status(406).send("No uid provided")

    const user = { uid: JSON.parse(resObj.message ?? "{uid: null}").uid }

    if (!user.uid) return res.status(400).send("Issue occured")

    // Generate tokens
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    // Send them to client
    res.json({accessToken: accessToken, refreshToken: refreshToken})
})


const serveAuth = () => {app.listen(port, () => console.log(`Auth served on port ${port}`))}

export default serveAuth