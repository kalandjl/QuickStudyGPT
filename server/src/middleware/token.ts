import { NextFunction, Request, Response } from "express";
import { authenticateAccessToken } from "../auth/index.ts";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({path: "./res/.env"})
dotenv.config()


// Before user can access db calls, their jwt token must be authorized
export const authenticateTokenMW = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.sendStatus(401)
    if (!process.env.ACCESS_TOKEN_SECRET) return res.sendStatus(401)

    authenticateAccessToken(token)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        //@ts-ignore
        if (err) return res.status(401).send(err)
        
        //@ts-ignore
        req.user = user
        next()
    })
}