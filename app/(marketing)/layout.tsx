import React from "react";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}
const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};

export default MarketingLayout;
