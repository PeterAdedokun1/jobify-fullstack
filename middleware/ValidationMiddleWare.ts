import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator"
import { BadRequestError } from "../errors/CustomError";

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;


const withValidateErrors = (validateValues: any): [ValidationMiddleware, ValidationMiddleware, ValidationMiddleware] => {
    return [validateValues, (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        console.log(errors.isEmpty())
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg).join(', ');
           throw new BadRequestError(errorMessages)
        }
        next()
    }, (req: Request, res: Response) => {
        const { name } = req.body;
        res.json({ msg: `hello ${name}` })
    }]
}
export const validateTest = withValidateErrors(
    [body("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("name must be between 3 and 50 characters long").trim()
    ])
        

