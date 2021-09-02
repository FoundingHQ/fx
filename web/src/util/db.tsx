import { ReactNode } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import { apiRequest } from "./request";

// For interacting with the React Query cache
const queryClient = new QueryClient();

/**** USERS ****/

// Fetch user data (hook)
// This is called automatically by auth.js and merged into auth.user
export const useUser = (uid: string) => {
  // Unique cache key for this query
  const cacheKey = ["user", { uid }];
  // Query for fetching user
  const query = () => apiRequest(`user-get?uid=${uid}`);
  // Fetch with react-query (only if we have a uid)
  // Docs: https://react-query.tanstack.com/guides/queries
  return useQuery(cacheKey, query, { enabled: !!uid });
};

// Create a new user
export const createUser = (uid: string, data = {}) => {
  return apiRequest("user-create", "POST", { uid, ...data });
};

// Update an existing user
export const updateUser = async (uid: string, data: {}) => {
  const response = await apiRequest(`user-update?uid=${uid}`, "PATCH", data);
  // Invalidate and refetch queries that could have old data
  await queryClient.invalidateQueries(["user", { uid }]);
  return response;
};

type Props = {
  children: ReactNode;
};

// React Query context provider that wraps our app
export const QueryClientProvider = (props: Props) => {
  return (
    <QueryClientProviderBase client={queryClient}>
      {props.children}
    </QueryClientProviderBase>
  );
};
