"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.loginSchema = void 0;
const yup = __importStar(require("yup"));
exports.loginSchema = yup.object({
    email: yup.string().trim().required('Email is required')
        .email('Email is invalid'),
    password: yup.string().trim().required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password must not exceed 30 characters')
});
exports.signupSchema = yup.object({
    email: yup.string().email("Invalid email!").required("Email required!"),
    name: yup.string().trim()
        .required("Name required!")
        .min(3, "Name too short!")
        .max(28, "Name too long!"),
    password: yup.string().trim()
        .required("Password required!")
        .min(6, "Password too short!")
        .max(28, "Password too long!"),
});
