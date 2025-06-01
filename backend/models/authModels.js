import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Full name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password.toString(), 12) 
    next()
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = model("User", userSchema)

export default User