import Comment from "../models/Comment.js"
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addComment = async (req,res,next)=>{

    const newcomment = new Comment({...req.body, userId: req.user.id})
    
    try {
        const savedComment = await newcomment.save();
        res.status(200).send(savedComment);
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req,res,next)=>{
    try {
        const deletedComment = await Comment.findById(req.params.id) 
        const deletedVideo = await Video.findById(req.params.id) 
        if(req.user.id ==- deletedComment.userId || req.user.id === deletedVideo.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("comment has been deleted")
        }else{
            return next(createError(403, "You can delete only your comment! "))
        }
    } catch (error) {
        next(error)
    }
}

export const getComments = async (req,res,next)=>{
    try {
        const getComment = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(getComment);
    } catch (error) {
        next(error)
    }
}