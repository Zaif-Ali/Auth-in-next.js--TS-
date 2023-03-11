import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../Database/db";
import { ResponseData } from "../../../interfaces/IRserver";
import userExistence from "../../../lib/Existence";
import user from "../../../models/user";
import GetToken from "../../../utils/TokenSign";
import cookie from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "POST": {
            try {
                const db = await connectDB();
                const { name, email, password } = req.body;

                // Check User Existance
                const { found, userData } = await userExistence(email);

                if (found && userData) {
                    const data: ResponseData = {
                        user: {
                            email: email,
                            name: name
                        },
                        message: "Emial already exist",
                        status: 400,
                        success: false,
                        error: "Email already exist",
                    };
                    return res.status(400).json(data);
                }

                // Get token
                const token = await GetToken(email, 'user');

                // Creating new user
                const newUser = new user({
                    name: name,
                    email: email,
                    password: password,
                });

                await newUser.save();

                // Saving the token in the response Header
                res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true,
                    maxAge: 3600,
                    path: '/'
                }))

                // success response
                const data: ResponseData = {
                    user: {
                        email,
                        name,
                    },
                    message: "Register Verify",
                    status: 200,
                    success: true,
                    error: null,

                };

                db.close();
                return res.status(200).json(data);
            } catch (error) {
                return res.status(500).send(error);
            }
        }

        // If the method was not a POST
        default: {
            const data: ResponseData = {
                message: "Invalid Api Call",
                status: 500,
                success: false,
                error: "Invalid Api Call",
            };
            return res.status(400).json(data);
        }
    }


}