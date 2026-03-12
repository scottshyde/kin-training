import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // This function only runs for authenticated users
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    '/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
