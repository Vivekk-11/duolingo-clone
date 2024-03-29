import React from "react";

interface Props {
  children: React.ReactNode;
}

const FeedWrapper = ({ children }: Props) => {
  return <div className="top-0 flex-1 relative pb-10">{children}</div>;
};

export default FeedWrapper;
