import { SEO } from "@components";
import { AuthForm } from "@lib/auth/components/AuthForm";
import { useRedirectOnceAuthed } from "@lib/auth/data/authHooks";

export const LoginPage = () => {
  useRedirectOnceAuthed("/protected");
  return (
    <>
      <SEO title="Login" />
      <h1>Login</h1>
      <AuthForm authType="login" submitButtonText="login" />
    </>
  );
};

export default LoginPage;
