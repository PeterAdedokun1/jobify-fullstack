import { NextFunction , Request,Response} from "express"
import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleWare = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = (err as any).statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || "something went wrong, try again later"

    res.status(statusCode).json({ msg})
}

export default errorHandlerMiddleWare