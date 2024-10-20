import express from "express"
import basicMW from "../../middleware/basic.ts"
import createRouter from "./create/index.ts"

const app = express.Router()

basicMW(app)

app.use('/create', createRouter)

export default app