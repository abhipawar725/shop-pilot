import User from "../models/authModels.js";
import bcrypt from "bcrypt"

export const Signup = async (req, res) => {
    try {
        const {fullname, email, password, role} = req.body
        
        const existingUser = await User.find({email})
        if(existingUser) return res.status(409).json({message: "User already exits"})
        
        const encryptedPassword = await bcrypt.hash(password.toString(), 12) 
            
        const user = new User({
            fullname,
            email,
            password: encryptedPassword
        })

        await user.save()

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}