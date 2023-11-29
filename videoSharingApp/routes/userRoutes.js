import express from "express";
import { updateUser, deleteUser, subscribeUser, getUser,unsubscribeUser,likeVideo, dislikeVideo } from "../controller/userController.js";
import { verifyToken } from "../verifyToken.js";

const userRouter = express.Router();

// update user
userRouter.put("/:id", verifyToken, updateUser) 

// delete user
userRouter.delete("/:id", verifyToken, deleteUser)

// get a user
userRouter.get("/find/:id", getUser)

// subscribe a user
userRouter.put("/sub/:id", verifyToken,  subscribeUser)


// unsubscribe a user
userRouter.put("/unsub/:id", verifyToken, unsubscribeUser)


// like a video
userRouter.put("/like/:videoId", verifyToken, likeVideo)


// dislike a video
userRouter.put("/dislike/:videoId", verifyToken, dislikeVideo)



export default userRouter;