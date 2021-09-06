import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "react-query";

// For interacting with the React Query cache
export const queryClient = new QueryClient();

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
