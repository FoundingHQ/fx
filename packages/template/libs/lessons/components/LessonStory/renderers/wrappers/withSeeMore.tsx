import { ReactNode, useState } from "react";
import { Action, SeeMoreProps, Story } from "../../interfaces";
import SeeMore from "../../components/SeeMore";

interface Props {
  story: Story;
  action: Action;
  customCollapsed?: SeeMoreProps["customCollapsed"];
  children: ReactNode;
}

const WithSeeMore = ({ story, action, customCollapsed, children }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const toggleMore = (show: boolean) => {
    action(show ? "pause" : "play");
    setShowMore(show);
  };
  const CollapsedComponent = SeeMore;
  return (
    <>
      {children}
      {story.seeMore && (
        <div
          style={{
            position: "absolute",
            margin: "auto",
            bottom: showMore ? "unset" : 0,
            zIndex: 15,
            width: "100%",
            height: showMore ? "100%" : "auto",
          }}
        >
          <CollapsedComponent
            action={action}
            toggleMore={toggleMore}
            showContent={showMore}
            seeMoreContent={story.seeMore}
            customCollapsed={customCollapsed || story.seeMoreCollapsed}
          />
        </div>
      )}
    </>
  );
};

export default WithSeeMore;
