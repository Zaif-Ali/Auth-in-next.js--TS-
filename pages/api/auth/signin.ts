import { NextApiResponse } from "next";
import { NextApiRequest } from "next/types";
import connectDB from "../../../Database/db";
import { ResponseData } from "../../../interfaces/IRserver";
import userExistence from "../../../lib/Existence";
import { verifyPassword } from "../../../lib/Verification";
import GetToken from "../../../utils/TokenSign";
import cookie from "cookie";

export default async function hanlder(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case 'POST':
            {
                try {
                    const db = await connectDB();
                    const { email, password } = req.body;
                    // Check User Existance
                    const { found, userData } = await userExistence(email);
                    if (!found) {
                        const data: ResponseData = {
                            message: "Invalid email or password",
                            status: 404,
                            success: false,
                            error: "Invalid email or password"
                        }
                        return res
                            .status(400)
                            .json(data);
                    }

                    // Verify the password
                    if (!userData) {
                        throw new Error('User data is undefined');
                    }
                    const passwordMatch = await verifyPassword(userData, password);
                    if (!passwordMatch) {
                        const data: ResponseData = {
                            message: 'Invalid email or password',
                            status: 401,
                            success: false,
                            error: 'Invalid email or password',
                        };
                        return res.status(401).json(data);
                    }
                    // Get token
                    const token = await GetToken(email , userData.role);

                    // Saving the token in the response Header
                    res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
                        httpOnly: true,
                        sameSite: "strict",
                        secure: true,
                        maxAge: 3600,
                        path: '/'
                    }))

                    // success Response
                    const data: ResponseData = {
                        user: {
                            email: userData?.email,
                            name: userData?.name,
                        },
                        message: "Verification Successfully Done",
                        status: 200,
                        success: true,
                        error: null,
    
                    }
                    db.close();
                    return res.status(200).json(data);
                } catch (error) {
                    return res.status(500).send(error)
                }
            }

        // If the method was not a POST
        default:
            {
                const data: ResponseData = {
                    message: "Invalid Api Call",
                    status: 500,
                    success: false,
                    error: "Invalid Api Call"
                }
                res.status(400).json(data)
            }
            break;
    }
}