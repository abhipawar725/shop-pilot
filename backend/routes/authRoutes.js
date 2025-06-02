import express from "express"
import {getLogin, getSignup, Login, Signup } from "../controllers/authControllers.js"

const router = express.Router()

router.get("/signup", getSignup)
router.get("/login", getLogin)
router.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
})

router.post("/api/signup", Signup)
router.post("/api/login", Login)


export default router