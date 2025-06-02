import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import router from "./routes/authRoutes.js"
import path, { join } from "path"
import { fileURLToPath } from "url"
import cookieParser from "cookie-parser" 
import productRouter from "./routes/productRoutes.js"
import protectRouteer from "./routes/protectedRoutes.js"

dotenv.config()

const port = process.env.PORT || 4000
const db = process.env.DB_URL

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

mongoose.connect(db)
.then(() => console.log("Database is connected"))
.catch((error) => console.log("Database error", error))

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static("public"))

app.use("/", router)
app.use("/", protectRouteer)
app.use("/api/products", productRouter)


app.listen(port, () => console.log("App is connected"))

