// JWT token assign 
import { sign, SignOptions } from 'jsonwebtoken';
import { config } from "dotenv";
config();
const { JWT_SECRET } = process.env;
export default async function GetToken(useremail: string , role : string) {

    if (!useremail || !role) {
        throw new Error('Server Error');
    }
    
    const payload = { useremail , role };

    if (JWT_SECRET == undefined) {
        throw new Error('Server Error');
    }
    const options: SignOptions = {
        expiresIn: '1d',
    };

    const token = sign(payload, JWT_SECRET, options);
    return token;
}