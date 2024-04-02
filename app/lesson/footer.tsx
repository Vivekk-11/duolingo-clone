"use client";

import React from "react";
import { useKey, useMedia } from "react-use";
import { XCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
  lessonId?: boolean;
  status: "wrong" | "correct" | "none" | "completed";
  onCheck: () => void;
}

const Footer = ({ disabled, status, onCheck, lessonId }: Props) => {
  const isMobile = useMedia("(max-width: 1024px)");
  useKey("Enter", onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        "border-t-2 h-[100px] lg:h-[140px]",
        status === "wrong" && "border-transparent bg-rose-100",
        status === "correct" && "border-transparent bg-green-100"
      )}
    >
      <div className="h-full max-w-[1140px] mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base flex items-center lg:text-2xl">
            <CheckCircle className="w-6 h-6 lg:w-10 lg:h-10 mr-4" />
            Nicely done!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base flex items-center lg:text-2xl">
            <XCircle className="w-6 h-6 lg:w-10 lg:h-10 mr-4" />
            Try again!
          </div>
        )}
        {status === "completed" && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
          >
            Practice again!
          </Button>
        )}
        <Button
          size={isMobile ? "sm" : "lg"}
          disabled={disabled}
          onClick={onCheck}
          className="ml-auto"
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
