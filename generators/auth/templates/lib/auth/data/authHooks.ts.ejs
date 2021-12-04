import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { fetcher } from "@util/query";
import {
  clientAuthRoutes,
  <% if (props.type === "jwt") { %>ACCESS_TOKEN_TIMEOUT<% } %>
} from "@lib/auth/server/authConfig";

// We should subset this to only interface we need.
import { User as PrismaUser } from "@prisma/client";
export type User = Pick<PrismaUser, "id" | "email" | "name" | "image" | "role">;
export type Session = { accessToken: string; user: User };

export type AuthInput = { email: string; password: string };

const sessionKey = "session";
<% if (props.type === "jwt") { %>
const defaultSessionTimeout = ACCESS_TOKEN_TIMEOUT - 1000;
<% } %>

const useHandleAuth = (shouldInvalidate = false) => {
  const queryClient = useQueryClient();

  const handleAuth = ({ accessToken, user }: Session) => {
    queryClient.setQueryData(sessionKey, { user, accessToken });
    if (shouldInvalidate) {
      queryClient.invalidateQueries();
    }
  };

  return handleAuth;
};

export const useCurrentUser = () => {
  return useQuery<Session>(sessionKey, () =>
    fetcher.post(clientAuthRoutes.currentUser)
  );
};

const useAuthRedirect = (shouldBeAuthed: boolean, redirectPath: string) => {
  const { data, isLoading, isSuccess, isError } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && data) {
      if (shouldBeAuthed && !data.user) {
        router.push(redirectPath);
      }
      if (!shouldBeAuthed && data.user) {
        router.push(redirectPath);
      }
    }
  }, [isSuccess, data]);

  return { data, isLoading, isSuccess, isError };
};

export const useRequireAuth = (redirectPath: string) => {
  return useAuthRedirect(true, redirectPath);
};

export const useRedirectOnceAuthed = (redirectPath: string) => {
  return useAuthRedirect(false, redirectPath);
};
<% if (props.type === "jwt") { %>
export const useSession = () => {
  const [refetchInterval, setRefetchInterval] = useState(defaultSessionTimeout);
  return useQuery<Session>(
    sessionKey,
    () => fetcher.post(clientAuthRoutes.refresh),
    {
      onError: () => setRefetchInterval(0),
      refetchInterval: refetchInterval,
      refetchIntervalInBackground: refetchInterval ? true : false,
      refetchOnMount: refetchInterval ? true : false,
      refetchOnReconnect: refetchInterval ? true : false,
      refetchOnWindowFocus: refetchInterval ? true : false,
      retry: false,
      retryOnMount: false,
    }
  );
};
<% } %>
export const useLogin = () => {
  const handleAuth = useHandleAuth();
  return useMutation(
    (data: AuthInput) => fetcher.post(clientAuthRoutes.login, data),
    {
      onSuccess: handleAuth,
    }
  );
};

export const useSignup = () => {
  const handleAuth = useHandleAuth();
  return useMutation(
    (data: AuthInput) => fetcher.post(clientAuthRoutes.signup, data),
    {
      onSuccess: handleAuth,
    }
  );
};

export const useLogout = () => {
  const handleAuth = useHandleAuth(true);
  return useMutation(() => fetcher.post(clientAuthRoutes.logout), {
    onSuccess: handleAuth,
  });
};
