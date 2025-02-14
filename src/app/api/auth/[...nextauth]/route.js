import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import { connectToDatabase } from "@/lib/connectDB"; // Ensure correct path

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          return null; // Return null if email or password is missing
        }

        // Connect to the database
        const client = await connectToDatabase();

        // Make sure the client is valid and access the correct db
        if (!client || !client.db) {
          return null; // Return null if the db is not available
        }

        const db = client.db(); // Access the database
        const currentUser = await db.collection("users").findOne({ email });

        if (!currentUser) {
          return null; // User not found
        }

        // Check if the password matches (using bcryptjs compare)
        const passwordMatched = await bcryptjs.compare(password, currentUser.password);
        if (!passwordMatched) {
          return null; // Password does not match
        }

        return currentUser; // Return the authenticated user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/LogIn", // Custom sign-in page
  },
});

export { handler as GET, handler as POST };