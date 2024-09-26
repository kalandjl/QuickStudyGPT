import express from "express";
import { correctAnswers, getQuestions } from "../func/gpt.js";
import basicMW from "../middleware/basic.js";
const port = 4000;
const app = express();
// Sets up basic middleware
basicMW(app);
// Returns GPT response to notes
app.post('/gpt', async (req, res) => {
    if (!req.body)
        return res.status(404).send("No prompt");
    console.log("Pending gpt response");
    const gptres = (await getQuestions(req.body.notes))?.choices[0];
    console.log("Completed");
    if (gptres) {
        return res.status(200).send(gptres);
    }
    return res.status(400).send("failure to gpt :(");
});
app.post('/correct', async (req, res) => {
    if (!req.body)
        return res.status(404).send("No prompt");
    const gptres = (await correctAnswers(req.body.notes, req.body.answers, req.body.questions))?.choices[0];
    if (gptres) {
        return res.status(200).send(gptres);
    }
    return res.status(400).send("failure to gpt :(");
});
// Serve
const serveApi = () => { app.listen(port, () => { console.log(`Api served on port ${port}`); }); };
export default serveApi;
//# sourceMappingURL=api.js.map