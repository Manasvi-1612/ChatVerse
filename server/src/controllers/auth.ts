import { Request, Response, NextFunction, CookieOptions } from "express";
import bcrypt from "bcryptjs";
import { findUniqueUser, createUser, signToken } from "../services/user";
// import session from "express-session";
import AppError from "../utils/errorHandler";


const cookieOptions: CookieOptions = {
    // maxAge: 1000 * 60 * 15, // would expire after 15 minutes // Expires specifying an actual date-time, and Max-Age specifying a time span.
    expires: new Date(Date.now() + 86400000), // would expire after 24 hours
    httpOnly: true, // The cookie only accessible by the web server
    // signed: true // Indicates if the cookie should be signed
}

export const signupUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("req.body", req.body);
        const user = await findUniqueUser({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = await createUser({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        })

        res.status(201).json({
            status: 'success',
            message:
                'A user is successfully created. Please login to continue.',
        });

    } catch (error) {
        console.log("error", error);
        next(error);
    }
}

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = await findUniqueUser({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" })
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return next(new AppError(400, 'Invalid Credentials'));
        }

        const token = signToken(user);
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            status: 'success',
            message: 'User is successfully logged in.',
            token
        });

    } catch (error) {
        console.log("error", error);
        next(error);
    }
}