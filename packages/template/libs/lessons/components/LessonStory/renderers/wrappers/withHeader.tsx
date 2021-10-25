import { ReactNode } from "react";
import { Story } from "../../interfaces";
import Header from "../../components/Header";

interface Props {
  story: Story;
  globalHeader?: Function;
  children: ReactNode;
}

const WithHeader = ({ story, globalHeader, children }: Props) => {
  return (
    <>
      {children}
      {story.header && (
        <div style={{ position: "absolute", left: 12, top: 20, zIndex: 19 }}>
          {typeof story === "object" ? (
            globalHeader ? (
              globalHeader(story.header)
            ) : (
              <Header
                heading={story.header.heading}
                subheading={story.header.subheading}
                profileImage={story.header.profileImage}
              />
            )
          ) : null}
        </div>
      )}
    </>
  );
};

export default WithHeader;
