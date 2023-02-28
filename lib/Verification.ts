import { IUser } from "../interfaces/IRserver";
import bcrypt from 'bcrypt';
// Password Verification
export async function verifyPassword(user: IUser, password: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (error) {
        throw new Error(`Error while verifying password: ${error}`);
    }
}