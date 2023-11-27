import express from "express";
import {addVideo, updateVideo, deleteVideo, getVideo, addView, random, trend, subscribe, getByTags, getByTitle} from '../controller/videoController.js';
import {verifyToken} from "../verifyToken.js"

const videoRouter = express.Router();
// add video
videoRouter.post("/", verifyToken, addVideo)

// update video
videoRouter.put("/:id", verifyToken, updateVideo)

// delete video
videoRouter.delete("/:id", verifyToken, deleteVideo)

// get video
videoRouter.get("/find/:id", getVideo)

// view video
videoRouter.get("/view/:id", addView )

// trend video
videoRouter.get("/trend", trend)

// random video
videoRouter.get("/random", random)

// subscribe video
videoRouter.get("/sub", verifyToken, subscribe)

// get video by tags
videoRouter.get("/tags/", getByTags )

// get video by title 
videoRouter.get("/search/", getByTitle )

export default videoRouter;