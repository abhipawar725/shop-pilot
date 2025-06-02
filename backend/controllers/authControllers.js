import User from "../models/authModels.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exits" });

    const newUser = new User({
      fullname,
      email,
      password
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      redirect: "/login"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const Login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(404).json({message: "Incorrect user or password"})
    
    const encryptedPassword = await bcrypt.compare(password, user.password) 
    if(!encryptedPassword) return res.status(401).json({message: "Incorrect user or password"}) 

    const payload = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role
    }  
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
    res.cookie('token', token, {httpOnly: true})  
    res.status(200).json({
      message: "Login Successfully",
      redirect: "/dashboard"
    }) 

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const getSignup = (req, res) => {
  res.render("signup");
};

export const getLogin = (req, res) => {
  res.render("login")
}
