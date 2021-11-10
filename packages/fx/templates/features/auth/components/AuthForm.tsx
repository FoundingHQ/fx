import { useSignup, useLogin } from "@lib/auth/data/authHooks";

type Props = {
  authType: "signup" | "login";
  submitButtonText: React.ReactNode;
};

export const AuthForm = ({ authType, submitButtonText }: Props) => {
  const { mutate: signup } = useSignup();
  const { mutate: login } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-expect-error
    const { email, password } = e.currentTarget.elements;
    const action = authType === "signup" ? signup : login;
    action({ email: email.value, password: password.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">{submitButtonText}</button>
    </form>
  );
};
