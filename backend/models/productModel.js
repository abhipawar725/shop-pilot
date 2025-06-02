import { Schema, model } from "mongoose";

const productSchema = new Schema({
   name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
   },
   description: {
    type: String,
    trim: true
   },
   price: {
    type: Number,
    trim: true,
    required: [true, "Price is required"],
    min: 0
   }
}, {timestamps: true})

const Product = model("Product", productSchema)

export default Product