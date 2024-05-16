const express = require("express");
const router = express.Router();

import { loginUserHandler, signupUserHandler } from "../controllers/auth";
// import { rateLimiter } from "../middleware/rateLimiter";
import { validate } from "../validators";
import { loginSchema, signupSchema } from "../validators/auth";


router.post("/auth/login", validate(loginSchema), loginUserHandler);

router.post("/auth/signup", validate(signupSchema), signupUserHandler);

module.exports = router