import { useRequireAuth, useLogout } from "@lib/auth/data/authHooks";

export const ProtectedPage = () => {
  const { data, isLoading, isSuccess } = useRequireAuth("/auth/login");
  const { mutate } = useLogout();

  if (isLoading) return null;
  if (!isLoading && !isSuccess) return <div>Error</div>;

  return (
    <div>
      <h1>You are logged in as:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => mutate()}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
