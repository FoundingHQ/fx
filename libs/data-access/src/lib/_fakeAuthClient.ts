const User = {
  uid: "123",
  email: "a@a.com",
  name: "a",
  picture: "",
  providers: [] as string[],
};

const Client = {
  signup(_email: string, _pass: string) {
    return Promise.resolve({ user: User });
  },
  signin(_email: string, _pass: string) {
    return Promise.resolve({ user: User });
  },
  signinWithProvider(_provider: string) {
    return Promise.resolve({ user: User });
  },
  signout() {
    return Promise.resolve();
  },
  onChange(_cb: (response: { user: typeof User }) => Promise<void>) {
    return () => {
      console.log("onChange auth");
    };
  },
  sendPasswordResetEmail(_email: string) {
    return Promise.resolve();
  },
  confirmPasswordReset(_email: string, _code: string) {
    return Promise.resolve();
  },
  updateEmail(_email: string) {
    return Promise.resolve(User);
  },
  updatePassword(_pass: string) {
    return Promise.resolve();
  },
  updateProfile(_data: Record<string, string>) {
    return Promise.resolve({ user: User });
  },
  getCurrentUser() {
    return Promise.resolve(User);
  },
  getAccessToken() {
    return Promise.resolve("");
  },
};

export default Client;
