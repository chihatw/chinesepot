import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

function getRedirectPath(pathname: string, user: any): string | null {
  // ログインページにアクセスしているが、すでにユーザーがログインしている場合はトップページへリダイレクト
  if (pathname.startsWith('/login') && user) return '/';

  // /articleページに未ログインでアクセスした場合はログインページへリダイレクト
  if (pathname.startsWith('/article') && !user) return '/login';

  // トップページにアクセスした場合のリダイレクト処理
  if (pathname === '/') {
    // 未ログインならログインページへリダイレクト
    if (!user) return '/login';
  }

  return null;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const redirectPath = getRedirectPath(request.nextUrl.pathname, user);

  if (redirectPath) {
    const url = request.nextUrl.clone();
    url.pathname = redirectPath;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
