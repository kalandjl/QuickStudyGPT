
import express, { Request, Response } from "express"
import { correctAnswers, generateQuestions, getQuestions } from "../func/gpt.js"
import basicMW from "../middleware/basic.js"

const port = 4000
const app = express()

// Sets up basic middleware
basicMW(app)

// Returns initial GPT response to notes
app.post('/gpt-initial', async (req: Request, res: Response) => {
  
    if (!req.body) return res.status(404).send("No prompt")

    console.log("Pending gpt response")

    const gptres = (await getQuestions(req.body.notes))?.choices[0]

    console.log("Completed")

    if (gptres) {

        return res.status(200).send(gptres)
    }

    return res.status(400).send("failure to gpt :(")
})

// Returns new GPT response to already generated notes
app.post('/gpt-gen', async (req: Request, res: Response) => {

     
    if (!req.body) return res.status(404).send("No prompt")

    console.log("Pending gpt response")

    const gptres = (await generateQuestions(req.body.notes, req.body.prev))?.choices[0]

    console.log("Completed")

    if (gptres) {

        return res.status(200).send(gptres)
    }

    return res.status(400).send("failure to gpt :(")
})

app.post('/correct', async (req: Request, res: Response) => {

    if (!req.body) return res.status(404).send("No prompt")

    const gptres = (await correctAnswers(req.body.notes, req.body.answers, req.body.questions))?.choices[0]

    if (gptres) {

        return res.status(200).send(gptres)
    }
    

    return res.status(400).send("failure to gpt :(")
})



// Serve
const serveApi = () => {app.listen(port, () => {console.log(`Api served on port ${port}`)})}

export default serveApi