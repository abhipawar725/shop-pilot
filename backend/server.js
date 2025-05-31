import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"

dotenv.config()
const port = process.env.PORT || 3000
const db = process.env.DB_URL

mongoose.connect(db)
.then(() => console.log("Database is connected"))
.catch((error) => console.log("Database error", error))

const app = express()

app.get("/api/signup" , (req, res) => {
    res.send("signup page")
})

app.get("/api/login", (req, res) => {
    res.send("login page") 
})

app.listen(port, () => console.log("App is connected"))