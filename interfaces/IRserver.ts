import { Document } from 'mongoose';
// Interface of Server Response
interface userData {
    email?: string,
    name?: string
}
export interface ResponseData extends userData {
    success: boolean,
    status: number,
    message: string,
    error?: string | null,
    user?: userData,
}
// Interface of the user Model
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}
// Interface of the JWT Payload 
export interface IFverifyPayload {
    useremail: string,
    role: string,
    iat: number,
    exp: number
}
