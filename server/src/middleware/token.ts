import { NextFunction, Request, Response } from "express";
import { authenticateAccessToken } from "../auth/index.js";
require("dotenv").config()


// Before user can access db calls, their jwt token must be authorized
export const authenticateTokenMW = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (token === null) return res.sendStatus(401)

    authenticateAccessToken(token)
}