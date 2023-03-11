import { NextRequest, NextResponse } from 'next/server';

import isAuthenticated from './lib/auth';
import { authcheck } from './utils/CheckPaths';

export async function middleware(request: NextRequest) {
  // Routes 
  const loginURl = new URL('/auth/login', request.url);
  const unknownPage = new URL('/404', request.url);
  const value = request.cookies.get('auth')?.valueOf();
  // If the value is not present 
  if (!value) {
    return NextResponse.rewrite(loginURl);

  }
  // if the token is not verifyied  
  const verifiedToken = value && (await isAuthenticated(value).catch((err) => {
    console.log(err);
  }))
  // if they are not verifyied 
  if (!verifiedToken) {
    return NextResponse.rewrite(loginURl);
  }
  // if verifyied but trying to acess the login or register page
  if (verifiedToken && authcheck(request)) {
    return NextResponse.redirect(unknownPage);
  }
  // If upcoming person is not admin they redirect to the 404 poage 
  if (verifiedToken != 'admin' && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(unknownPage);
  }

}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*"]
}
