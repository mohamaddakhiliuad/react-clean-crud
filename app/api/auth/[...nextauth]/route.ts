// app/api/auth/[...nextauth]/route.ts

// ✅ Import the main NextAuth library to handle authentication in Next.js
import NextAuth from "next-auth";

// ✅ Import your centralized authentication configuration (providers, callbacks, etc.)
import { authConfig } from "@/auth.config";

// ✅ Initialize NextAuth with the imported configuration
// This returns a request handler that processes auth routes (signin, signout, session, etc.)
const handler = NextAuth(authConfig);

// ✅ Export the same handler for both GET and POST requests
// NextAuth automatically handles different auth actions depending on the HTTP method
export { handler as GET, handler as POST };
