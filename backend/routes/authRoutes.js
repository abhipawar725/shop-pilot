import express from "express"
import { getDashboard, getLogin, getSignup, Login, Signup } from "../controllers/authControllers.js"
import verifyToken from "../middelwares/authMiddelware.js"

const router = express.Router()

router.get("/signup", getSignup)
router.get("/login", getLogin)
router.get("/dashboard",verifyToken, getDashboard)

router.post("/api/signup", Signup)
router.post("/api/login", Login)


export default router