import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({path: "./res/.env"})
dotenv.config()


export const generateAccessToken = (user: { uid: string }) => {

    if (!process.env.ACCESS_TOKEN_SECRET) return

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

export const generateRefreshToken = (user: {uid: string}) => {

    if (!process.env.REFRESH_TOKEN_SECRET) return

    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

export const authenticateAccessToken = (token: string): string | undefined => {

    if (!process.env.ACCESS_TOKEN_SECRET) return

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, res: any) => {
        
        if (err) return res.status(401).send(err)
        
        return res.uid
    })
}

export const authenticateRefreshToken = (token: string, res: Response): string | undefined => {

    if (!process.env.REFRESH_TOKEN_SECRET) return

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, r) => {
        
        console.log(err)
        if (err || !r) return res.status(401).send(err)

        console.log(err,r)

        // @ts-ignore
        return r.uid
    })
}
