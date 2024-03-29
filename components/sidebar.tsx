import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex bg-blue-500 h-full lg:w-[256px] lg:fixed left-0 top-0 border-r-2 flex-col px-4",
        className
      )}
    >
      Sidebar
    </div>
  );
};

export default Sidebar;
