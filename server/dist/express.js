import express from "express";
import cors from "cors";
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));
const port = 4000;
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000"
    });
    next();
});
app.post('/gpt', (req, res) => {
    console.log(req.body);
    res.status(202).send(req.body);
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=express.js.map