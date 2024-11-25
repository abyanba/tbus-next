import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: String(user.id), // Pastikan id dikonversi ke string
          email: user.email,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (user.role === "ADMIN" || user.role === "USER") {
        return true; // Izinkan login
      } else {
        return false; // Tolak login jika role tidak valid
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        role: token.role as string,
        email: token.email as string,
        username: token.username as string,
      };
      console.log("Session:", session);
      return session;
    },
  },  
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Redirect ke halaman login jika belum login
  },
});

export { handler as GET, handler as POST };
