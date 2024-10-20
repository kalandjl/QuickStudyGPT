import basicMW from "../../../middleware/basic.ts";
import express, { Request, Response } from "express"

import mongo from "mongodb"

const { MongoClient } = mongo

const app = express.Router()

// Sets up basic middleware
basicMW(app)

// Replace the uri string with your connection string.
const uri = `mongodb+srv://admin:${process.env.DB_PASSWORD}@serverlessinstance0.fxkbq2c.mongodb.net/`

app.post("/user", async (req: Request, res: Response) => {

    const client = new MongoClient(uri)
  
    const { body } = req

    console.log(body)

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


export default app