import { useContext, createContext, ReactNode } from "react";
import { User, useSession } from "@libs/auth/data/authHooks";

const AuthContext = createContext<{ user?: User; accessToken?: string }>({
  user: undefined,
  accessToken: undefined,
});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const { data } = useSession();
  return (
    <AuthContext.Provider
      value={{ user: data?.user, accessToken: data?.accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
