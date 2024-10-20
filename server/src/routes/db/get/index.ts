import basicMW from "../../../middleware/basic.ts";
import express, { Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config({path: "./res/.env"})
dotenv.config()

import mongo, { ObjectId } from "mongodb"
import { authenticateTokenMW } from "../../../middleware/token.ts";

const { MongoClient } = mongo

const app = express.Router()

// Sets up basic middleware
basicMW(app)

// Replace the uri string with your connection string.
const uri = process.env.DB_URI

app.post('/set', async (req: Request, res: Response) => {


    if (!uri) return res.sendStatus(404)

    const client = new MongoClient(uri)
  
    const { body } = req
    let { query } = body

    if (!query) return res.send(404)

    try {
        await client.connect()
        
        const db = client.db("QuickStudyGPT")

        if (Object.keys(query)[0] === "_id") query = {_id: new ObjectId(query._id)}

        console.log(query)
    
        const t = await db.collection("sets").findOne(query)
    
        if (!t) return res.sendStatus(404)
        console.log('found doc')

        
        res.status(200).send(t)
    } catch (error) {
        
        console.error("Error while fetching data:", error)
        res.status(500).send("Internal Server Error")
    } finally {
        
        await client.close()
    }
})

export default app