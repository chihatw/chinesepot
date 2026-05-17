import { NextResponse, type NextRequest } from 'next/server';

function getRedirectPath(pathname: string, hasCookie: boolean): string | null {
  if (pathname.startsWith('/login') && hasCookie) return '/';
  if (pathname.startsWith('/articles') && !hasCookie) return '/login';
  if (pathname === '/' && !hasCookie) return '/login';
  return null;
}

export async function updateSession(request: NextRequest) {
  const authCookie = request.cookies.get('auth');
  const hasCookie = !!authCookie;

  const redirectPath = getRedirectPath(request.nextUrl.pathname, hasCookie);
  if (redirectPath) {
    const url = request.nextUrl.clone();
    url.pathname = redirectPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request });
}
