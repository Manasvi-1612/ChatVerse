"use strict";
//Error is built-in class in Node.js
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode = 500, message) {
        //overriding the Error class constructor
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
