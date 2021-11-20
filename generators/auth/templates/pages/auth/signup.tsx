import { SEO } from "@components";
import { AuthForm } from "@lib/auth/components/AuthForm";
import { useRedirectOnceAuthed } from "@lib/auth/data/authHooks";

export const SignupPage = () => {
  useRedirectOnceAuthed("/protected");
  return (
    <>
      <SEO title="Signup" />
      <h1>Signup</h1>
      <AuthForm authType="signup" submitButtonText="sign up" />
    </>
  );
};

export default SignupPage;
