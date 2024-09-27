import { NextFunction } from "express"
import jwt from "jsonwebtoken"

export const generateAccessToken = (user: { uid: string }) => {

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

export const generateRefreshToken = (user: {uid: string}) => {

    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

export const authenticateAccessToken = (token: string) => {

    let uid: string

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, res: any) => {
        
        if (err) return res.status(401).send(err)
        
        uid = res.uid
    })

    return uid
}

export const authenticateRefreshToken = (token: string) => {

    let uid: string 

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err: any, res: any) => {
        
        if (err) return res.status(401).send(err)

        uid = res.uid
    })

    return uid
}