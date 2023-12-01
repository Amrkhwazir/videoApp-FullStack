import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next)=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDJjMjVjMmYxNDNhYmNhZWM4YWQwNiIsImlhdCI6MTcwMTQwMDA5Mn0.P4-AyCTjNiaKPHU15XYUFS5Vji0o4Zf8ZXVRQFzSZvI"

    if(!token){
        return next(createError(402, "you are not authenticated!"))
    }else{
        jwt.verify(token, process.env.JWT, (err, user)=>{
            if(err) return next(createError(402, "Token is invalid!"));
            req.user = user;
            next()

     
        })
    }

 
} 