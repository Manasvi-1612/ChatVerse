const express = require("express");
const router = express.Router();

import { Request, Response } from "express";
import { loginUserHandler, signupUserHandler } from "../controllers/auth";
import { IUserRequest, veriftToken } from "../middleware/auth";
// import { rateLimiter } from "../middleware/rateLimiter";
import { validate } from "../validators";
import { loginSchema, signupSchema } from "../validators/auth";


router.post("/auth/login", validate(loginSchema), loginUserHandler);

router.post("/auth/signup", validate(signupSchema), signupUserHandler);

router.get("/auth/verify-token", veriftToken, (req: IUserRequest, res: Response) => {
    res.json(req.user)
})

module.exports = router