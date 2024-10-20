import { findUser } from "./mock.ts"
import mongo from "mongodb"
import dotenv from "dotenv"
import { ErrorObject } from "../../types/types.ts"

const { MongoClient } = mongo

dotenv.config({path: "./res/.env"})
dotenv.config()

const uri = process.env.DB_URI

export const verifyUser = async (params: {email: string, password: string}) => {

    if (!uri) return
    
    const client = new MongoClient(uri)

    await client.connect()
    
    try {

        const {email, password} = params

        const user = await client.db("QuickStudyGPT").collection("users").findOne({"email": email})

        if (!user) throw new Error("No such email")
        if (user.password != password) throw new Error("Wrong password given")
    
        return user
    } catch (e: any) {

        return {code: 400, message: e.message}
    } finally {
        
        await client.close()
    }
}

export const getUser = async (uid: string) => {

    if (!uri) return

    try {

        const client = new MongoClient(uri)

        await client.connect()

        let val = await client.db("QuickStudyGPT").collection("users").findOne({uid: uid})

        if (val === null) throw new Error("No user found")

        return val
    } catch (e:any) {
        let errorObject: ErrorObject = {code:400,message:e.message}

        return errorObject
    }
}