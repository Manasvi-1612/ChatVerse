"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const auth_controller_1 = require("../controllers/auth.controller");
// import { rateLimiter } from "../middleware/rateLimiter";
const validators_1 = require("../validators");
const auth_validator_1 = require("../validators/auth.validator");
const rateLimiterRule = {
    apiKey: "rateLimiter",
    rateLimit: {
        maxLimit: 5,
        expiresIn: 60
    }
};
router.post("/auth/login", (0, validators_1.validate)(auth_validator_1.loginSchema), auth_controller_1.loginUserHandler);
router.post("/auth/signup", (0, validators_1.validate)(auth_validator_1.signupSchema), auth_controller_1.signupUserHandler);
module.exports = router;
