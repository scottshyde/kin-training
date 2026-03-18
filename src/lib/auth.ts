import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { JWT } from 'next-auth/jwt';

// Define users - can be moved to environment variables
const VALID_USERS = [
  { email: 'admin@kinhome.com', password: 'kinhome2024', role: 'admin' },
  { email: 'rep@kinhome.com', password: 'trainme', role: 'closer' },
  { email: 'setter@kinhome.com', password: 'buckets', role: 'setter' },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = VALID_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.email,
            email: user.email,
            name: user.email.split('@')[0],
            role: user.role,
          };
        }

        throw new Error('Invalid credentials');
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-key',
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
