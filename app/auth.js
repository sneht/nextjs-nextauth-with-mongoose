import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email_address: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          console.log("🚀 ~ authorize: ~ credentials:", credentials);
          const { email_address, password } = credentials || {};
          if (!email_address || !password) {
            return null;
          }
          const user = await new Promise((resolve, reject) => {
            setTimeout(() => {
              // Simulate user validation logic here
              // if (
              //   email_address === "test@example.com" &&
              //   password === "password123"
              // ) {
              resolve({
                id: "7364-7625-27283-9373",
                email: email_address,
              });
              // } else {
              //   reject(new Error("Invalid credentials"));
              // }
            }, 1000); // Simulating a delay of 1 second
          });

          return user;
          // return {
          //   id: "7364-7625-27283-9373",
          //   email: email_address,
          // };
        } catch (error) {
          console.log(error);
          return error;
        }
      },
    }),
    Google,
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
});
