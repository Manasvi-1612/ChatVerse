import { object, AnySchema, ValidationError } from 'yup'
import { Request, Response, NextFunction } from 'express'

export const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const res = await schema.validate(req.body, { abortEarly: false })
        return next()
    } catch (error) {
        const validationError = error as ValidationError
        console.log(validationError.errors)
        return res.status(400).json({ error: validationError.errors[0] })
    }
}