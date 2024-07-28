const express = require("express");
const router = express.Router();

import { Request, Response } from "express";
import { loginUserHandler, logoutHandler, refreshHandler, signupUserHandler } from "../controllers/auth";
import { IUserRequest, veriftToken } from "../middleware/auth";
import { loginLimiter } from "../middleware/loginLimiter";
import { validate } from "../validators";
import { loginSchema, signupSchema } from "../validators/auth";


router.post("/auth/login", validate(loginSchema), loginUserHandler);

router.post("/auth/signup", validate(signupSchema), signupUserHandler);

router.post("/auth/logout", logoutHandler)

router.get('/auth/refresh', refreshHandler)

router.get("/auth/verify", veriftToken, (req: IUserRequest, res: Response) => {
    try {
        res.status(200).json({ message: "User is verified", user: req.user })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
})
module.exports = router