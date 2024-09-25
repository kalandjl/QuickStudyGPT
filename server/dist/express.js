import express from "express";
import cors from "cors";
import { correctAnswers, getQuestions } from "./gpt.js";
import * as dotenv from 'dotenv';
import { catchError } from "./catch.js";
import { verifyUser } from "./db/main.js";
import jwt from "jsonwebtoken";
dotenv.config();
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));
app.use((req, res, next) => {
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
const port = 4000;
// Authenticate user and return token
app.post('/login', async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    let resObj = await catchError(verifyUser, { email: email, password: password });
    if (resObj.code !== 200) {
        return res.status(resObj.code).send(resObj.message);
    }
    let resMessage = JSON.parse(resObj.message ?? "{uid: null}");
    if (!resMessage.uid)
        return res.status(406).send("No uid provided");
    const user = { uid: JSON.parse(resObj.message ?? "{uid: null}").uid };
    if (!user.uid)
        return res.status(400).send("Issue occured");
    console.log(user);
    const accessToken = generateAccessToken(user.uid);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});
app.post('/gpt', async (req, res) => {
    console.log(req.body);
    if (!req.body)
        return res.status(404).send("No prompt");
    const gptres = (await getQuestions(req.body.notes))?.choices[0];
    if (gptres) {
        console.log(gptres);
        return res.status(200).send(gptres);
    }
    return res.status(400).send("failure to gpt :(");
});
app.post('/correct', async (req, res) => {
    console.log(req.body);
    if (!req.body)
        return res.status(404).send("No prompt");
    const gptres = (await correctAnswers(req.body.notes, req.body.answers, req.body.questions))?.choices[0];
    if (gptres) {
        console.log(req.body);
        return res.status(200).send(gptres);
    }
    return res.status(400).send("failure to gpt :(");
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=express.js.map