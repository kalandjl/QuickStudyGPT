import express, { Request, Response } from "express"
import { LogInReqBody } from "../types/types.js"
import { catchError } from "../misc/catch.js"
import { verifyUser } from "../db/sql/main.js"
import { generateAccessToken, generateRefreshToken } from "../auth/index.js"
import basicMW from "../middleware/basic.js"
import { nodeRedisDemo } from "../db/redis/index.js"

const port = 5000
const app = express()

// Sets up basic middleware
basicMW(app)


// Authenticate user and return token
app.post('/login', async (req: Request, res: Response) => {

    nodeRedisDemo()

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


// Serve
const serveAuth = () => {app.listen(port, () => console.log(`Auth served on port ${port}`))}

export default serveAuth