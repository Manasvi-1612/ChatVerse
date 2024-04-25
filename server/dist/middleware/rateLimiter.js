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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const redis_1 = require("../redis");
const redis = (0, redis_1.getRedis)();
const rateLimiter = (rule) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ip = req.ip;
            const key = `${rule.apiKey}:${ip}`;
            const userRequest = yield redis.incr(key);
            // console.log("userRequest", userRequest)
            if (userRequest <= 1) {
                // set expiry time after 60 seconds
                yield redis.expire(key, 60);
            }
            if (userRequest > rule.rateLimit.maxLimit) {
                return res.status(429).json('Too many requests');
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.rateLimiter = rateLimiter;
