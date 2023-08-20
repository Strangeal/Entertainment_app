import { prisma } from "@/lib/prima";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // if any of the privided credentials are not valid (return null)
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // check if user exit by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // if not, return null
        if (!user) {
          return null;
        }

        // check if password is correct
        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        );

        // if not correct, return null
        if (!isPasswordCorrect) {
          return null;
        }

        // return user data
        return {
          id: user.id + "",
          email: user.email,
          full_name: user.full_name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      console.log("Session Callback:", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          full_name: token.full_name,
        },
      };
    },
    jwt: async ({ token, user }) => {
      console.log("JWT Callback:", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          email: u.email,
          name: u.full_name,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
