import { NextRequest, NextResponse } from 'next/server';
import isAuthenticated from './lib/auth';


export async function middleware(request: NextRequest) {
  // Verification of the Token
  const token = request.cookies.get('auth')?.valueOf();
  console.log('running');

  if (!token) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }

  const verifiedToken = token && (await isAuthenticated(token).catch((err) => {
    console.error(err);
  }))

  if (!verifiedToken) {
    return NextResponse.rewrite(new URL('/login', request.url));
  }
  if (request.url.includes('/login') && verifiedToken) {
    console.log('running login');
    console.log(verifiedToken);

    NextResponse.redirect(new URL('/admin', request.url))
    return;
  }
  if (request.nextUrl.pathname.startsWith('/login')) {

    return NextResponse.rewrite(new URL('/register', request.url))
  }

}

// export const config = {
//   matcher: ['/login', '/admin'],
// }
