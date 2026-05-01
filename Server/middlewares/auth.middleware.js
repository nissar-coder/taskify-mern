import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyToken = async(req, res, next)=>{
    try {
        let token;
        if (req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")) 
        {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
         return res.status(401).json({message: "Authorization failed token doesn't exist"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodedToken.id).select("-password")
        next()
              
    } catch (error) {
        return res.status(401).json({message: "Authorization Failed"})
    }
}