import express from "express"
import basicMW from "../../middleware/basic.ts"
import createRouter from "./create/index.ts"
import getRouter from "./get/index.ts"

const app = express.Router()

basicMW(app)

app.use('/create', createRouter)
app.use('/get', getRouter)


export default app