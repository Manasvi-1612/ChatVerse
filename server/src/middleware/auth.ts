import { NextFunction, Request, Response } from "express";
import AppError from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { findUniqueUser } from "../services/user";
import { User } from "@prisma/client";

export interface IUserRequest extends Request {
    user: User
}

export const veriftToken = async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token || req.header('Authorization')?.replace("Bearer ", "")
        
        if (!token) {
            throw new AppError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

        const user = await findUniqueUser({ id: decodedToken._id });

        if (!user) {
            throw new AppError(401, "Invalid Access Token")
        }

        req.user = { ...user, password: "" }
        next()

    } catch (error) {
        console.log("error", error);
        next(error);
    }
}