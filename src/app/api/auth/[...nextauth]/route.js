  import NextAuth, { getServerSession } from "next-auth"
  import GoogleProvider from "next-auth/providers/google"

  const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID, // Your Google client ID
        clientSecret: process.env.GOOGLE_SECRET_ID, // Your Google client secret
      }),
      // ...add more providers here
    ],
    // Additional NextAuth configurations can go here
  }

  const handler = NextAuth(authOptions);
  export async function isAdmin(req, authOptions) {
    const session = await getServerSession(req, null, authOptions);
    if (!session) return false;
  
    const adminEmails = process.env.ADMIN_EMAILS.split(',');
    return adminEmails.includes(session.user.email);
  }  export {handler as GET ,handler as POST}
