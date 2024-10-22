import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse, type  NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

    console.log('middleware test 5');

    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}?redirectUrl=${request.nextUrl.pathname}`);
    }
    
    const url = new URL(request.url);
    const origin = url.origin;
    const pathname = url.pathname;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);
    requestHeaders.set('x-origin', origin);
    requestHeaders.set('x-pathname', pathname);
    
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}

export const config = {
  matcher: ['/name/:path*'],
};
