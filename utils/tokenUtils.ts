import jwt from "jsonwebtoken";

export const createJWT = (payload: string | object | Buffer) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token
}


export const verifyJWT = (token: any) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    return decoded
}