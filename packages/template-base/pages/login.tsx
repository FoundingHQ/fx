import tw from "tailwind-styled-components";
import { SEO, Heading } from "@components";

const Page = tw.main`flex h-screen`;
const Container = tw.section`m-auto text-center`;

export const LoginPage = () => {
  return (
    <>
      <SEO />
      <Page>
        <Container>
          <Heading className="mb-2">Login Page</Heading>
        </Container>
      </Page>
    </>
  );
};

export default LoginPage;
