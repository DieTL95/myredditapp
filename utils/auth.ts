import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { redditScopes, refreshAccessToken } from "@/lib/utils";
const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://myredditapp.vercel.app",
    "https://media.redgifs.com",
  ],

  socialProviders: {
    reddit: {
      clientId: process.env.REDDIT_CLIENT as string,
      clientSecret: process.env.REDDIT_SECRET as string,

      scope: redditScopes,
      refreshAccessToken: async (refreshToken) => {
        console.log(refreshToken);
        return await refreshAccessToken({
          refreshToken,

          options: {
            clientId: process.env.REDDIT_CLIENT as string,
            clientSecret: process.env.REDDIT_SECRET as string,
          },
          authentication: "basic",
          tokenEndpoint: "https://www.reddit.com/api/v1/access_token",
        });
      },
      duration: "permanent",
      mapProfileToUser: (profile) => {
        return {
          email: profile.name || null,
          name: profile.name,
          id: profile.id,
          image: profile.icon_img || "",
          emailVerified: profile.has_verified_email,
        };
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, // Cache duration in seconds
    },
  },

  plugins: [
    customSession(async ({ user, session }) => {
      return {
        user,
        session,
      };
    }),
    nextCookies(),
  ],
});
