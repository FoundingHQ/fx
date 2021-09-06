import {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
  ReactNode,
  ComponentType,
} from "react";
import queryString from "query-string";
import router from "next/router";
import { useUser, createUser, updateUser } from "../actions/user";
import authClient from "../lib/_fakeAuthClient";

// Whether to merge extra user data from database into auth.user
const MERGE_DB_USER = false;

type ContextProps = {
  user: User | null | undefined | false;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<User> | undefined;
  signin: (email: string, password: string) => Promise<User> | undefined;
  signinWithProvider: (
    _name: "google" | "facebook"
  ) => Promise<User> | undefined;
  signout: () => Promise<void> | undefined;
  sendPasswordResetEmail: (_email: string) => Promise<void> | undefined;
  confirmPasswordReset: (
    _password: string,
    _code: string
  ) => Promise<void> | undefined;
  updateEmail: (_email: string) => Promise<void> | undefined;
  updatePassword: (_password: string) => Promise<void> | undefined;
  updateProfile: (data: User) => Promise<void> | undefined;
};

type User = {
  uid: string;
  email: string;
  name: string;
  picture: string;
  providers: string[];
};

const AuthContext = createContext<Partial<ContextProps>>({});

type Props = {
  children: ReactNode;
};
// Context Provider component that wraps your app and makes auth object
// available to any child component that calls the useAuth() hook.
export const AuthProvider = ({ children }: Props) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Hook that enables any component to subscribe to auth state
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
function useAuthProvider() {
  // Store auth user object
  const [user, setUser] = useState<false | null | User>(null);

  // Format final user object and merge extra data from database
  const finalUser = usePrepareUser(user);

  // Handle response from authentication functions
  const handleAuth = async (user: User) => {
    // Create the user in the database
    // fake-auth doesn't indicate if they are new so we attempt to create user every time
    await createUser(user.uid, { email: user.email });

    // Update user in state
    setUser(user);
    return user;
  };

  const signup = (email: string, password: string) => {
    return authClient
      .signup(email, password)
      .then((response: { user: User }) => handleAuth(response.user));
  };

  const signin = (email: string, password: string) => {
    return authClient
      .signin(email, password)
      .then((response: { user: User }) => handleAuth(response.user));
  };

  const signinWithProvider = (name: string) => {
    return authClient
      .signinWithProvider(name)
      .then((response: { user: User }) => handleAuth(response.user));
  };

  const signout = () => {
    return authClient.signout();
  };

  const sendPasswordResetEmail = (email: string) => {
    return authClient.sendPasswordResetEmail(email);
  };

  const confirmPasswordReset = (password: string, code: string) => {
    // [INTEGRATING AN AUTH SERVICE]: If not passing in "code" as the second
    // arg above then make sure getFromQueryString() below has the correct
    // url parameter name (it might not be "code").

    // Get code from query string object
    const resetCode = code || getFromQueryString("code");
    return authClient.confirmPasswordReset(password, resetCode);
  };

  const updateEmail = (email: string) => {
    return authClient.updateEmail(email).then((rawUser: User) => {
      setUser(rawUser);
    });
  };

  const updatePassword = (password: string) => {
    return authClient.updatePassword(password);
  };

  // Update auth user and persist to database (including any custom values in data)
  // Forms can call this function instead of multiple auth/db update functions
  const updateProfile = async (data: User) => {
    const { email, name, picture } = data;

    // Update auth email
    if (email) {
      await authClient.updateEmail(email);
    }

    // Update auth profile fields
    if (name || picture) {
      const fields: Record<string, string> = {};
      if (name) fields.name = name;
      if (picture) fields.picture = picture;
      await authClient.updateProfile(fields);
    }

    // Persist all data to the database
    await updateUser(user ? user.uid : "", data);

    // Update user in state
    const currentUser = await authClient.getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    // Subscribe to user on mount
    const unsubscribe = authClient.onChange(
      async (response: { user: User }) => {
        if (response.user) {
          setUser(response.user);
        } else {
          setUser(false);
        }
      }
    );

    // Unsubscribe on cleanup
    return () => unsubscribe();
  }, []);

  return {
    user: finalUser,
    signup,
    signin,
    signinWithProvider,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateEmail,
    updatePassword,
    updateProfile,
  };
}

// Format final user object and merge extra data from database
function usePrepareUser(user: (User & { provider?: string }) | null | false) {
  const uid = MERGE_DB_USER ? (user ? user.uid : "") : "";
  // Fetch extra data from database (if enabled and auth user has been fetched)
  const userDbQuery = useUser(uid);

  // Memoize so we only create a new object if user or userDbQuery changes
  return useMemo(() => {
    // Return if auth user is null (loading) or false (not authenticated)
    if (!user) return user;

    // Data we want to include from auth user object
    const finalUser = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      picture: user.picture,
      providers: [] as string[],
    };

    // Include an array of user's auth providers, such as ["password", "google", etc]
    // Components can read this to prompt user to re-auth with the correct provider
    finalUser.providers = [user.provider || ""];

    // If merging user data from database is enabled ...
    if (MERGE_DB_USER) {
      switch (userDbQuery.status) {
        case "idle":
          // Return null user until we have db data to merge
          return null;
        case "loading":
          return null;
        case "error":
          // Log query error to console
          console.error(userDbQuery.error);
          return null;
        case "success":
          // If user data doesn't exist we assume this means user just signed up and the createUser
          // function just hasn't completed. We return null to indicate a loading state.
          if (userDbQuery.data === null) return null;

          // Merge user data from database into finalUser object
          Object.assign(finalUser, userDbQuery.data);

        // no default
      }
    }

    return finalUser;
  }, [user, userDbQuery]);
}

const getDisplayName = (Component: ComponentType) =>
  Component.displayName || Component.name || "Component";

// A Higher Order Component for requiring authentication
export const requireAuth = (
  Component: ComponentType,
  redirectBack: boolean
) => {
  const WithAuth = (props: any) => {
    // Get authenticated user
    const auth = useAuth();

    useEffect(() => {
      // Redirect if not signed in
      if (auth.user === false) {
        router.replace({
          pathname: "/auth/signin",
          query: { next: redirectBack ? window.location.href : "" },
        });
      }
    }, [auth]);

    // Show loading indicator
    // We're either loading (user is null) or we're about to redirect (user is false)
    if (!auth.user) {
      return null;
    }

    // Render component now that we have user
    return <Component {...props} />;
  };

  WithAuth.displayName = `WithAuth(${getDisplayName(Component)})`;

  return WithAuth;
};

const getFromQueryString = (key = "") => {
  return queryString.parse(window.location.search)[key] as string;
};
