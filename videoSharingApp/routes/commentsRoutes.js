import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addComment, deleteComment, getComments } from "../controller/comentsController.js";

const commentsRouter = express.Router();

// add comment router
commentsRouter.post("/", verifyToken, addComment)

// add comment router
commentsRouter.delete("/:id", verifyToken, deleteComment)

// add comment router
commentsRouter.get("/:videoId", getComments)

export default commentsRouter;