import { NextResponse, NextRequest } from 'next/server';
import { auth } from './auth';

export const middleware = auth(async (req: NextRequest) => {
  const session = await auth();

  const protectedPaths = [
    '/',
    '/profile',
    '/browse',
    '/posts',
    '/search',
    '/create',
    '/users',
  ];
  const currentPath = req.nextUrl.pathname;

  const isProtected = protectedPaths.includes(currentPath);

  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (session && currentPath === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/:path*', '/profile/:path*', '/login'],
};
