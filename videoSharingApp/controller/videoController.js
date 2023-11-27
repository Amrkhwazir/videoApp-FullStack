
import Video from '../models/Video.js';
import User from '../models/User.js';

// add video function
export const addVideo = async (req, res, next)=>{
    const newVideo = new Video({userId: req.user.id, ...req.body});
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error)
    }
}

// update video function
export const updateVideo = async (req, res, next)=>{
try {
    const video = await Video.findById(req.params.id);
    if(!video) return   next(createError(404,"Video not found"));
    if(req.user.id === video.userId){
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },
        {new: true});
        res.status(200).json(updateVideo);
    }else{
        next(createError(404,"you can update only your video"));
    }
    } catch (error) {
        next(error)
    }
}

// delete video function
export const deleteVideo = async (req, res, next)=>{
try {
    const video = await Video.findById(req.params.id);
    if(!video) return   next(createError(404,"Video not found"));
    if(req.user.id === video.userId){
        await Video.findByIdAndDelete(req.params.id,);
        res.status(200).json("The video has been deleted");
    }else{
        next(createError(404,"you can delete only your video"));
    }
    } catch (error) {
        next(error)
    }
}

// getVideo function
export const getVideo = async (req, res, next)=>{
try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}


// add view function
export const addView = async (req, res, next)=>{
try {
       await Video.findByIdAndUpdate(req.params.id,{
            $inc: {views: 1}
        })
        res.status(200).json("The video has been increased.")
    } catch (error) {
        next(error)
    }
}

// random video function
export const random = async (req, res, next)=>{
try {
        const videos = await Video.aggregate([{$sample: {size: 40}}]);
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

// Trending video function
export const trend = async (req, res, next)=>{
try {
        const videos = await Video.find().sort({views: -1});
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

// subscribe channel function
export const subscribe = async (req, res, next)=>{
try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedChanel;
    
    const list = await Promise.all(
        subscribedChannels.map((channel)=>{
            return Video.find({userId: channel})
        })
        );
        res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt))
} catch (error) {
        next(error)
    }
}


// get tags video function
export const getByTags = async (req, res, next)=>{
    const tags = req.query.tags.split(",")
    // console.log(tags)
    try {
            const videos = await Video.find({tags:{$in: tags}}).limit(20);
            res.status(200).json(videos)
        } catch (error) {
            next(error)
        }
    }
    

// get title video function
export const getByTitle = async (req, res, next)=>{
    const   query = req.query.q
    try {
            const videos = await Video.find({title: {$regex: query, $options: "i"}});
            res.status(200).json(videos)
        } catch (error) {
            next(error)
        }
    }
    