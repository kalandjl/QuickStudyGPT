import express from "express"
// Start servers

import apiRouter from "./routes/api.ts";
import authRouter from "./routes/auth.ts";
import dbRouter from "./routes/db/index.ts"

const app = express()

const port = 4000

app.use('/api', apiRouter)
app.use('/auth', authRouter)
app.use('/db', dbRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api and http://localhost:${port}/auth`)
})
