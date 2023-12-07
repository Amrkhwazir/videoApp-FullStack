import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";



export const signup = async(req, res, next)=>{
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({...req.body, password: hash });

      await  newUser.save();
      res.status(200).send("user has been created");
    } catch (error) {
        next(error);
    }
};

export const signin = async(req, res, next)=>{
    console.log(req.body);
    try {
        const user =  await User.findOne({email: req.body.email});
        if(!user) return next(createError(404, "no user found"))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) return next(createError(400, "wrong password"))

        const token = jwt.sign({ id: user._id}, process.env.JWT);
        const {password, ...other } = user._doc;
        res
        .cookie("access_token", token, {
            httpOnly: true,
        }).status(200).send(other)  
    } catch (error) {
        next(error);
    }
};

export const googleAuth = async (req,res,next ) => {
try {
    const user = await User.findOne({email: req.body.email});
    if (user){
        const token = jwt.sign({id: user._id}, process.env.JWT);
        res
        .cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json(user._doc)
    }else{
        const newUser = new User({
            ...req.body,
            fromGoogle: true
        })
        const savedUser = await newUser.save();
        const token = jwt.sign({id: savedUser._id}, process.env.JWT);
        res
        .cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json(savedUser._doc)
    }

} catch (error) {
    next(error);
}
}