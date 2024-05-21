"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const validators_1 = require("../validators");
const auth_3 = require("../validators/auth");
router.post("/auth/login", (0, validators_1.validate)(auth_3.loginSchema), auth_1.loginUserHandler);
router.post("/auth/signup", (0, validators_1.validate)(auth_3.signupSchema), auth_1.signupUserHandler);
router.post("/auth/logout", auth_1.logoutHandler);
router.get('/auth/refresh', auth_1.refreshHandler);
router.get("/auth/verify", auth_2.veriftToken, (req, res) => {
    try {
        res.status(200).json({ message: "User is verified", user: req.user });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
