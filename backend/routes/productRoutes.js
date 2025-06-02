import express, { Router } from "express"
import {
    createProduct, 
    getProduct, 
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js"

import { adminOnly, protect } from "../middelwares/protectMiddelware.js"

const router = express.Router()

router.route("/")
.get(getProduct)
.post(protect, adminOnly, createProduct)

router.route("/:id")
.get(getProductById)
.put(protect, adminOnly, updateProduct)
.post(protect, adminOnly, deleteProduct)

export default router