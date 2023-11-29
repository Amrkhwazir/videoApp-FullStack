import express from "express";
import { signup, signin, googleAuth } from "../controller/authController.js";

const authRouter = express.Router();

// CREATE USER
authRouter.post("/signup",signup )
// SIGN IN
authRouter.post("/signin", signin)

// GOOGLE AUTH
authRouter.post("/google", googleAuth )

export default authRouter;