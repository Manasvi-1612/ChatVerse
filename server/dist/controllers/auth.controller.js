"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserHandler = exports.signupUserHandler = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_service_1 = require("../services/user.service");
// import session from "express-session";
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const cookieOptions = {
    // maxAge: 1000 * 60 * 15, // would expire after 15 minutes // Expires specifying an actual date-time, and Max-Age specifying a time span.
    expires: new Date(Date.now() + 86400000), // would expire after 24 hours
    httpOnly: true, // The cookie only accessible by the web server
    // signed: true // Indicates if the cookie should be signed
};
const signupUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(req.body.password, salt);
        const user = yield (0, user_service_1.findUniqueUser)({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exist" });
        }
        const newUser = yield (0, user_service_1.createUser)({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username
        });
        res.status(201).json({
            status: 'success',
            message: 'A user is successfully created. Please login to continue.',
        });
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
});
exports.signupUserHandler = signupUserHandler;
const loginUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.findUniqueUser)({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }
        if (!bcryptjs_1.default.compareSync(req.body.password, user.password)) {
            return next(new errorHandler_1.default(400, 'Invalid Credentials'));
        }
        const token = (0, user_service_1.signToken)(user);
        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            status: 'success',
            message: 'User is successfully logged in.',
            token
        });
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
});
exports.loginUserHandler = loginUserHandler;
