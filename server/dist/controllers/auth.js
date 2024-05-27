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
exports.logoutHandler = exports.refreshHandler = exports.loginUserHandler = exports.signupUserHandler = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../services/user");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookieOptions = {
    httpOnly: true, //accessible only by the web server
    // secure: true,// for https connection
    sameSite: 'none', //must be used to allow cross-site cookie use
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expiry time
};
const signupUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_1.findUniqueUser)({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exist" });
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newUser = yield (0, user_1.createUser)({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
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
        const user = yield (0, user_1.findUniqueUser)({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }
        if (!bcryptjs_1.default.compareSync(req.body.password, user.password)) {
            return next(new errorHandler_1.default(400, 'Invalid Credentials'));
        }
        const accessToken = (0, user_1.signToken)(user, process.env.ACCESS_TOKEN_SECRET, '10s');
        const refreshToken = (0, user_1.signToken)(user, process.env.REFRESH_TOKEN_SECRET, '1d');
        // // Saving refreshToken with current user
        user.refreshToken = refreshToken;
        const result = yield (0, user_1.updateUser)({ id: user.id }, user);
        // //secure cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            // secure: true,// for https connection
            sameSite: 'none',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expiry time
        });
        // //sent access token containing user data
        res.status(200).json({
            status: 'success',
            message: 'User is successfully logged in.',
            accessToken,
        });
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
});
exports.loginUserHandler = loginUserHandler;
//refresh token generates a new access token if refresh token in cookie is valid
const refreshHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = req.cookies;
        if (!(cookie === null || cookie === void 0 ? void 0 : cookie.jwt)) {
            throw new errorHandler_1.default(401, 'Unauthorized');
        }
        const refreshToken = cookie.jwt;
        //verification of the token 
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw new errorHandler_1.default(403, 'Forbidden');
            const user = yield (0, user_1.findUniqueUser)({ id: decoded._id });
            if (!user)
                throw new errorHandler_1.default(401, 'Unauthorized');
            //generate a new access token - this is the new token that will be used to access protected routes
            const accessToken = (0, user_1.signToken)(user, process.env.ACCESS_TOKEN_SECRET, '10s');
            res.status(200).json({ accessToken });
        }));
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
});
exports.refreshHandler = refreshHandler;
const logoutHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // On client, also delete the accessToken
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(204); //No content
        const refreshToken = cookies.jwt;
        // Is refreshToken in db?
        const user = yield (0, user_1.findUser)({ refreshToken });
        if (!user) {
            res.clearCookie('jwt', cookieOptions);
            return res.sendStatus(204);
        }
        // Delete refreshToken in db
        user.refreshToken = null;
        const result = yield (0, user_1.updateUser)({ id: user.id }, user);
        res.clearCookie('jwt', cookieOptions);
        res.sendStatus(204);
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
});
exports.logoutHandler = logoutHandler;
