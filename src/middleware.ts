import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse, type  NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {

    console.log('middleware test 5');

    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}?redirectUrl=${req.nextUrl.pathname}`);
    }
    
  return NextResponse.next();
}

export const config = {
  matcher: ['/name/:path*'],
};
