import { GetServerSideProps } from "next";
import createHandler, { AppRequest, AppResponse } from "@server/handler";
import { User, useLogout } from "@lib/auth/data/authHooks";

type Props = {
  user: User;
};

export const ProtectedPage = ({ user }: Props) => {
  const { mutate } = useLogout();
  return (
    <div>
      <h1>You are logged in as:</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => mutate()}>Logout</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const handler = createHandler();
  const request = req as AppRequest;
  const response = res as AppResponse;
  try {
    await handler.run(request, response);
  } catch (error) {
    console.error(error);
  }

  if (!request.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user: request.user },
  };
};

export default ProtectedPage;
