import user from "../models/user";
import { IUser } from "../interfaces/IRserver"

export default async function userExistence(Uniqueness: string): Promise<{ found: boolean, userData?: IUser }> {
    try {
        const existingUser = await user.findOne({ email: Uniqueness });
        if (existingUser) {
            return { found: true, userData: existingUser };
        }
        return { found: false };
    } catch (error) {
        throw new Error(`Error while checking user existence: ${error}`);
    }
}