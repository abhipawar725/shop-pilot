import express from "express"
import {protect, adminOnly} from "../middelwares/protectMiddelware.js"

const router = express.Router()

router.get("/dashboard", protect, adminOnly, (req, res) => {
    const {id, fullname, email, role} = req.user
    res.render("dashboard", {
        id,fullname, email, role
    })
})

router.get("/create-product", protect, adminOnly, (req, res) => {
    const {id, fullname, email, role} = req.user
    res.render("create-product", {
        id,fullname, email, role
    })
})

export default router