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
exports.signToken = exports.findUser = exports.updateUser = exports.findUniqueUser = exports.createUser = void 0;
const db_1 = __importDefault(require("../services/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield db_1.default.user.create({
        data: input,
    }));
});
exports.createUser = createUser;
const findUniqueUser = (where, select) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield db_1.default.user.findUnique({
        where,
        select,
    }));
});
exports.findUniqueUser = findUniqueUser;
const updateUser = (where, data) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield db_1.default.user.update({
        where,
        data
    }));
});
exports.updateUser = updateUser;
const findUser = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.user.findFirst({
        where
    });
});
exports.findUser = findUser;
const signToken = (user, secret, expiresIn) => {
    //generate a token and send to client
    const token = jsonwebtoken_1.default.sign({ _id: user.id, email: user.email }, secret, { expiresIn });
    return token;
};
exports.signToken = signToken;
// exports.signout = (req, res) => {
//     res.clearCookie('token')
//     res.json({
//         message: "Signout successfully"
//     })
// }
//middleware only for the logged in user (it'll compare the incoming token with the token in the env file, returns true if they match)
// exports.requireSignin = JWT({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"]
// });
