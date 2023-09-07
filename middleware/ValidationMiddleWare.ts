import { NextFunction, Request, Response } from "express";
import { body, validationResult, param } from "express-validator"
import { BadRequestError, NotFoundError } from "../errors/CustomError";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import mongoose from "mongoose";
import Job from "../models/JobMode";
type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;



const withValidateErrors = (validateValues: any): [ValidationMiddleware, ValidationMiddleware] => {
    const validationMiddleware: ValidationMiddleware = (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors.isEmpty());
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg).join(', ');
            throw new BadRequestError(errorMessages);
        }
        next();
    };

    return [validateValues, validationMiddleware];
};
export const validateTest = withValidateErrors(
    [body("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("name must be between 3 and 50 characters long").trim()
    ])

export const validateJobInput = withValidateErrors(
    [
        body("company").notEmpty().withMessage("company is required"),
        body("position").notEmpty().withMessage("position is required"),
        body("jobLocation").notEmpty().withMessage("job location is required"),
        body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("Invalid status value"),
        body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid type value")
    ]
)
export const validateIdParams = withValidateErrors([
    // param("id").custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage("invalid MongoDb id")
    param("id").custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new BadRequestError("Invalid MongoDB id");
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`no job with id : ${value}`)
        
    })
])