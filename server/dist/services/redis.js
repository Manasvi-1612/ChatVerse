"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedis = void 0;
const ioredis_1 = require("ioredis");
const getRedis = () => {
    try {
        const redis = new ioredis_1.Redis();
        redis.on('error', (e) => {
            throw new Error(`Redis connection failed ${e}`);
        });
        redis.on('connect', () => {
            console.log('Redis connected');
        });
        return redis;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getRedis = getRedis;
