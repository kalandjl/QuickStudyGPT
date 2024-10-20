import express, { Request, Response } from "express"
import { LogInReqBody } from "../types/types.ts"
import { catchError } from "../misc/catch.ts"
import { verifyUser } from "../db/sql/main.ts"
import { authenticateRefreshToken, generateAccessToken, generateRefreshToken } from "../auth/index.ts"
import basicMW from "../middleware/basic.ts"
import doRedis from "../db/redis/index.ts"

const app = express.Router()

// Sets up basic middleware
basicMW(app)


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

    doRedis((client) => {

        client.set(refreshToken, refreshToken)
    })

    // Send them to client
    res.json({accessToken: accessToken, refreshToken: refreshToken})
})


// Logout user by deleleting refresh token
app.delete('/logout', async (req: Request, res: Response) => {


    if (!req.body.refreshToken) return res.sendStatus(404)

    // Delete refresh token
    doRedis((client) => client.del(req.body.refreshToken))  

    res.sendStatus(204)
})

app.post('/token', async (req: Request, res: Response) => {

    const refreshToken = req.body.refreshToken

    const refreshTokens = await doRedis((client) => {return client.keys('*')})

    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    // Return uid to sign new token with
    const uid = authenticateRefreshToken(refreshToken)

    console.log(uid)

    const accessToken = generateRefreshToken({uid: uid})


    res.json({accessToken: accessToken})
})


// Serve
export default app