"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
// import { rateLimiter } from "../middleware/rateLimiter";
const validators_1 = require("../validators");
const auth_3 = require("../validators/auth");
router.post("/auth/login", (0, validators_1.validate)(auth_3.loginSchema), auth_1.loginUserHandler);
router.post("/auth/signup", (0, validators_1.validate)(auth_3.signupSchema), auth_1.signupUserHandler);
router.get("/auth/verify-token", auth_2.veriftToken, (req, res) => {
    res.json(req.user);
});
module.exports = router;
