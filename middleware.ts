import { NextRequest, NextResponse } from 'next/server';
import isAuthenticated from './lib/auth';



export async function middleware(request: NextRequest) {
  const value = request.cookies.get('auth')?.valueOf();
  // If the value is not present 
  if (!value) {
    const loginURl = new URL('/auth/login', request.url);
    return NextResponse.rewrite(loginURl);
  }
  // if the token is not verifyied  
  const verifiedToken = value && (await isAuthenticated(value).catch((err) => {
    console.log(err);
    return false;
  }))
  // if they are not verifyied 
  if (!verifiedToken) {
    console.log(verifiedToken);
    const loginURl = new URL('/auth/login', request.url);
    return NextResponse.rewrite(loginURl);
  }
  // if verifyied but trying to acess the login or register page
  if (verifiedToken && (request.nextUrl.pathname.startsWith('/auth/login') || request.nextUrl.pathname.startsWith('/auth/register'))) {
    const unknownPage = new URL('/404', request.url);
    return NextResponse.redirect(unknownPage);
  }
}


export const config = {
  matcher: ["/auth/:path*", "/admin/:path*"]
}
