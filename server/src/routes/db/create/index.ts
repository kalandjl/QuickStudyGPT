import basicMW from "../../../middleware/basic.ts";
import express, { Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config({path: "./res/.env"})
dotenv.config()

import mongo from "mongodb"
import { authenticateTokenMW } from "../../../middleware/token.ts";

const { MongoClient } = mongo

const app = express.Router()

// Sets up basic middleware
basicMW(app)

// Replace the uri string with your connection string.
const uri = process.env.DB_URI

app.post("/user", async (req: Request, res: Response) => {

    if (!uri) return res.sendStatus(404)

    const client = new MongoClient(uri)
  
    const { body } = req

    if (!body) return res.send(404)

    try {
      await client.connect()
      const db = client.db("QuickStudyGPT")
  
      const t = await db.collection("users").insertOne({...body.data})
  
      console.log(t)
      res.status(200).send(t)
  
    } catch (error) {
        
      console.error("Error while fetching data:", error)
      res.status(500).send("Internal Server Error")
    } finally {
        
      await client.close()
    }
})

app.post('/set', authenticateTokenMW, async (req: Request, res: Response) => {

    console.log(req.body)
    
    if (!uri) return res.sendStatus(404)

    const client = new MongoClient(uri)
  
    const { body } = req

    console.log(body)

    if (!body) return res.send(404)

    try {
      await client.connect()
      const db = client.db("QuickStudyGPT")
  
      const t = await db.collection("sets").insertOne({...body.data})
  
      console.log("inserted doc")
      res.status(200).send(t)
  
    } catch (error) {
        
      console.error("Error while fetching data:", error)
      res.status(500).send("Internal Server Error")
    } finally {
        
      await client.close()
    }
})


export default app