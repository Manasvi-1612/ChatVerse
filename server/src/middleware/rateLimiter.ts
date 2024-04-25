import { getRedis } from "../redis";

import { NextFunction, Request, Response } from "express";

const redis = getRedis()!;

interface RateLimiterProps {
    apiKey: string;
    rateLimit: {
        maxLimit: number;
        expiresIn: number;
    }
}

export const rateLimiter = (rule: RateLimiterProps) => {


    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ip = req.ip;

            const key = `${rule.apiKey}:${ip}`;
            const userRequest = await redis.incr(key);

            // console.log("userRequest", userRequest)

            if (userRequest <= 1) {
                // set expiry time after 60 seconds
                await redis.expire(key, 60)
            }

            if (userRequest > rule.rateLimit.maxLimit) {
                return res.status(429).json('Too many requests')
            }

            next()
        } catch (error) {
            next(error)
        }
    }

};