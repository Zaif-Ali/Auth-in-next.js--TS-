import { NextRequest } from "next/server";

export const authcheck = (request: NextRequest): boolean => {
    if (request.nextUrl.pathname.startsWith('/auth/login') || request.nextUrl.pathname.startsWith('/auth/register')) {
        return true;
    } else {
        return false;
    }
} 