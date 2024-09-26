import { NextFunction } from "express"
import jwt from "jsonwebtoken"

export const generateAccessToken = (user: { uid: string }) => {

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

export const generateRefreshToken = (user: {uid: string}) => {

    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

export const authenticateToken = (token: string, next: NextFunction) => {

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        //@ts-ignore
        if (err) return res.status(401).send(err)
        
        //@ts-ignore
        req.user = user

        next()
    })
}