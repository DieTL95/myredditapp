import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
});

export const {
  signIn,
  signUp,
  useSession,
  getSession,
  getAccessToken,
  refreshToken,
} = createAuthClient({
  plugins: [customSessionClient<typeof auth>()],
});
