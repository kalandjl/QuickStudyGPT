import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({path: "./res/.env"})
dotenv.config()


export const generateAccessToken = (user: { uid: string }) => {

    if (!process.env.ACCESS_TOKEN_SECRET) return

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

export const generateRefreshToken = (user: {uid: string}) => {

    if (!process.env.REFRESH_TOKEN_SECRET) return

    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

export const authenticateAccessToken = (token: string, res: Response): string | undefined => {


    if (!process.env.ACCESS_TOKEN_SECRET) return

    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { uid: string }
        return decoded.uid
    } catch (err) {
        
        res.status(401).send(err)
        return undefined
    }
}

export const authenticateRefreshToken = (token: string, res: Response): string | undefined => {

    if (!process.env.REFRESH_TOKEN_SECRET) return

    try {

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as { uid: string }
        return decoded.uid
    } catch (err) {

        res.status(401).send(err)
        return undefined
    }
}
