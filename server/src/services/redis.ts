import { Redis } from "ioredis";

export const getRedis = () => {
    try {
        const redis = new Redis();


        redis.on('error', (e) => {
            throw new Error(`Redis connection failed ${e}`)
        })

        redis.on('connect', () => {
            console.log('Redis connected')
        })

        return redis;
    } catch (error) {
        console.log(error);
    }
}