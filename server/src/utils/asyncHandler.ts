//we can handle async request w.t.h of try/catch as well as Promise
import { Request, Response, NextFunction } from "express"

// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
//     }
// }


type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>;

//Async functions are Higher Order Functions that take a function as an argument and return a new function.
//here this fn function is passed to the next HO function
const asyncHandler = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fn(req, res, next)
    } catch (error: Error | any) {
        res.status(error.code || 500).json({ success: false, message: error.message })
    }
}

export { asyncHandler }