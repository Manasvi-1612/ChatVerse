import { NextFunction, Request, Response } from "express";
import AppError from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { findUniqueUser } from "../services/user";

export interface IUserRequest extends Request {
    user: {
        email: string;
        id: string;
    }
}

export const veriftToken = async (req: IUserRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization || req.headers.Authorization


    if (!(authHeader as string)?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = (authHeader as string).split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        (err: any, decoded: any) => {
            console.log("decoded", err)
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.user = { id: decoded._id, email: decoded.email }
            next()
        }
    )
}