import { PrismaClient, Prisma, User } from '@prisma/client';

const prisma = new PrismaClient();

import jwt from 'jsonwebtoken';

export const createUser = async (input: Prisma.UserCreateInput) => {
    return (await prisma.user.create({
        data: input,
    })) as User;
};

export const findUniqueUser = async (
    where: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect
) => {
    return (await prisma.user.findUnique({
        where,
        select,
    })) as User;
};


export const signToken = (user: Prisma.UserUncheckedCreateInput) => {
    //generate a token and send to client
    const token = jwt.sign({ _id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1d' })
    return token
}

// exports.signout = (req, res) => {
//     res.clearCookie('token')
//     res.json({
//         message: "Signout successfully"
//     })
// }


//middleware only for the logged in user (it'll compare the incoming token with the token in the env file, returns true if they match)
// exports.requireSignin = JWT({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"]
// });
