import { jwtVerify } from "jose";
import { IFverifyPayload } from "../interfaces/IRserver";



export const getJWTString = () => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET || JWT_SECRET.length === 0) {
        throw new Error('Invalid');
    }
    return JWT_SECRET;
}

export default async function isAuthenticated(token: string) {
    try {

        const verified = await jwtVerify(token, new TextEncoder().encode(getJWTString()))
        return verified.payload as IFverifyPayload;
    } catch (error) {
        throw new Error("Failed")
    }

}

