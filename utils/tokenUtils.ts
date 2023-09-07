import jwt from "jsonwebtoken";

export const createJWT = (payload: string | object | Buffer) => {
    const token = jwt.sign(payload, "secret", {
        expiresIn: "1d"
    })
    return token
}