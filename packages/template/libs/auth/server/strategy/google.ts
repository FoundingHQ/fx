import { Strategy } from "passport-google-oauth20";
import { getAccount } from "@libs/users/server/accountService";
import { createUser } from "@libs/users/server/userService";

export const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const account = await getAccount({
        provider: profile.provider,
        providerAccountId: profile.id,
      });
      if (account) {
        done(null, account.user);
      } else {
        const user = await createUser({
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : "",
          image: profile.photos ? profile.photos[0].value : "",
          account: {
            provider: profile.provider,
            providerAccountId: profile.id,
            accessToken,
            refreshToken,
          },
        });
        done(null, user);
      }
    } catch (error: any) {
      done(error);
    }
  }
);
