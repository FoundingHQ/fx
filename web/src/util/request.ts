import authClient from "util/_fakeAuthClient";

export const apiRequest = (path: string, method = "GET", data = {}) => {
  const accessToken = authClient.getAccessToken();

  return fetch(`/api/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status === "error") {
        // Automatically signout user if accessToken is no longer valid
        if (response.code === "auth/invalid-user-token") {
          authClient.signout();
        }

        throw new Error(response.message);
      } else {
        return response.data;
      }
    });
};
