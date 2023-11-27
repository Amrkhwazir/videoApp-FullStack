import express from "express";
import { signup, signin } from "../controller/authController.js";

const authRouter = express.Router();

// CREATE USER
authRouter.post("/signup",signup )
// SIGN IN
authRouter.post("/signin", signin)

// GOOGLE AUTH
authRouter.post("/google", )

export default authRouter;