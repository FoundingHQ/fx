import tw from "tailwind-styled-components";
import { SEO, Heading, Text } from "@template/ui";

const Page = tw.main`flex h-screen`;
const Container = tw.section`m-auto text-center`;

export const HomePage = () => {
  return (
    <>
      <SEO />
      <Page>
        <Container>
          <Heading className="mb-2">Founding Template</Heading>
          <Text>Hello world</Text>
        </Container>
      </Page>
    </>
  );
};

export default HomePage;
