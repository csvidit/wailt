import NextAuth from "next-auth";
import type { Session, Account, User } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import type { JWT } from "next-auth/jwt";
import axios from 'axios';

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

async function refreshAccessToken(token: JWT) {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken!,
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return {
      ...token,
      accessToken: response.data.access_token,
      expiresAt: Math.floor(Date.now() / 1000) + response.data.expires_in,
      refreshToken: response.data.refresh_token ?? token.refreshToken, // Fallback to old refresh token
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { auth, handlers } = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-read-playback-state,user-modify-playback-state,user-read-currently-playing,streaming,user-library-read,user-library-modify,user-top-read,user-read-recently-played",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: { token: JWT; account: Account | null, user?: User }) {
      if (account && user) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
          name: user.name,
          email: user.email,
          image: user.image,

        };
      } else if (token.expiresAt && Date.now() < (token.expiresAt * 1000)) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        return refreshAccessToken(token);
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresAt = token.expiresAt as number;
      session.user = session.user || {};
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;

      return session;
    },
  },
});
