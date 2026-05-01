import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"




export const RegisterUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body

      const existingUser = await User.findOne({ email });

       if (existingUser) {
           return res.status(400).json({message: "User already exist"})
       }

  const hashPassword = await bcrypt.hash(password, 10)

const createUser = await User.create({
  name,
  email,
  password: hashPassword  
});

       res.status(201).json({message: "User register successfully"})
   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const loginUser = async(req, res)=>{
    try {
    
        const {email, password} = req.body

      const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({message: "invalid credentials"})
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            res.status(400).json({message: "Invalid credentials"})
        }
    
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      )
      res.status(200).json({
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email
        }
      })

    } catch (error) {
         res.status(500).json({message: error.message})
    }
}


export default {RegisterUser, loginUser}