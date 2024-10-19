import express from "express"
// Start servers

import apiRouter from "./routes/api.ts";
import authRouter from "./routes/auth.ts";

const app = express()

const port = 4000

app.use('/api', apiRouter)
app.use('/auth', authRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api and http://localhost:${port}/auth`)
})