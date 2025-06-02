import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
    try {
       if(!req.body.name || !req.body.price) return res.status(401).json({message: "Product name and price is required"}) 
       const product = new Product(req.body)
       await product.save()
       res.status(201).json({
        message: "Product added successfully",
        product
       })
    } catch (error) {
       res.status(500).json({message: error.message})   
    }
}

export const getProduct = async (req, res) => {
    try {
       const products = await Product.find()
       if(products.length === 0) return res.status(200).json({message: "No product found"})
       res.status(200).json(products) 
    } catch (error) {
       res.status(500).json({message: error.message})   
    }
}

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product) return res.status(404).json({message: "Product not found"})
            
        res.status(200).json(product)    
    } catch (error) {
       res.status(500).json({message: error.message})   
    }
}

export const updateProduct = async (req, res) => {
    try {
       const {id} = req.params
       const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
       if(!product) return res.status(404).json({message: "Product not found"})
        
       res.status(200).json({
        message: "Product updated successfully",
        product
       }) 
    } catch (error) {
       res.status(500).json({message: error.message})   
    }
}

export const deleteProduct = async (req, res) => {
      try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product) return res.status(404).json({message: "Product not found"})
            
        res.status(200).json({message: "Product deleted successfully"})    
      } catch (error) {
        res.status(500).json({message: error.message})
      }    
}

