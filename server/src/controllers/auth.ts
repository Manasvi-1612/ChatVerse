import { Request, Response, NextFunction, CookieOptions } from "express";
import bcrypt from "bcryptjs";
import { findUniqueUser, createUser, signToken, updateUser, findUser } from "../services/user";
import AppError from "../utils/errorHandler";
import jwt from "jsonwebtoken";

const cookieOptions: CookieOptions = {
    httpOnly: true, //accessible only by the web server
    // secure: true,// for https connection
    sameSite: 'none', //must be used to allow cross-site cookie use
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expiry time
}

export const signupUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        const accessToken = signToken(user, process.env.ACCESS_TOKEN_SECRET!, '10s');
        const refreshToken = signToken(user, process.env.REFRESH_TOKEN_SECRET!, '1d');
        // // Saving refreshToken with current user
        user.refreshToken = refreshToken

        const result = await updateUser({ id: user.id }, user)

        // //secure cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none', //cross-site cookie 
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expiry time
        })

        // //sent access token containing user data
        res.status(200).json({
            status: 'success',
            message: 'User is successfully logged in.',
            accessToken,
        });

    } catch (error) {
        console.log("error", error);
        next(error);
    }
}

//refresh token generates a new access token if refresh token in cookie is valid
export const refreshHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const cookie = req.cookies

        if (!cookie?.jwt) {
            throw new AppError(401, 'Unauthorized')
        }

        const refreshToken = cookie.jwt
        //verification of the token 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
            async (err: any, decoded: any) => {
                if (err) throw new AppError(403, 'Forbidden')

                const user = await findUniqueUser({ id: decoded._id });

                if (!user) throw new AppError(401, 'Unauthorized')

                //generate a new access token - this is the new token that will be used to access protected routes
                const accessToken = signToken(user, process.env.ACCESS_TOKEN_SECRET!, '20s')

                res.status(200).json({ accessToken })
            }
        )

    } catch (error) {
        console.log("error", error);
        next(error);
    }
}


export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // On client, also delete the accessToken

        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204) //No content
        const refreshToken = cookies.jwt;


        // Is refreshToken in db?
        const user = await findUser({ refreshToken });

        if (!user) {
            res.clearCookie('jwt', cookieOptions);
            return res.sendStatus(204);
        }

        // Delete refreshToken in db

        user.refreshToken = null;
        const result = await updateUser({ id: user.id }, user)
        res.clearCookie('jwt', cookieOptions);

        res.sendStatus(204);
    } catch (error) {
        console.log("error", error);
        next(error);
    }
}
