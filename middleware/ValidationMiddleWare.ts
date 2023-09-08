import { NextFunction, Request, Response } from "express";
import { body, validationResult, param } from "express-validator"
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/CustomError";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import mongoose from "mongoose";
import Job from "../models/JobModel";
import User from "../models/UserModel";
type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;



const withValidateErrors = (validateValues: any): [ValidationMiddleware, ValidationMiddleware] => {
    const validationMiddleware: ValidationMiddleware = (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors.isEmpty());
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg).join(', ');
            if (errorMessages[0].startsWith("not authorized")) {
                throw new UnauthenticatedError("not authorized to access this route")
            }
            throw new BadRequestError(errorMessages);
        }
        next();
    };

    return [validateValues, validationMiddleware];
};


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
    param("id").custom(async (value,{req}) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new BadRequestError("Invalid MongoDB id");
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`no job with id : ${value}`);
        const isAdmin = req.user.role === "admin"
        const isOwner = req.user.userId = job.createdBy.toString();
        if (!isAdmin && !isOwner) {
            throw new UnauthenticatedError("not authorized to access this route")
        }

    })
])

export const validateRegisterInput = withValidateErrors([
    body("name").notEmpty().withMessage("name is required"),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError('email already exists');
            }
        }),
    body("password").notEmpty().withMessage("password is required").isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
    body("location").notEmpty().withMessage("location is required"),
    body("lastName").notEmpty().withMessage("last name is required")
])

export const validateLoginInput = withValidateErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidateErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email, { req }) => {
            const user = await User.findOne({ email });
            if (user && user._id.toString() !== req.user.userId) {
                throw new Error('email already exists');
            }
        }),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('location').notEmpty().withMessage('location is required'),
]);