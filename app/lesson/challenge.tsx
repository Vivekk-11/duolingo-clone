import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import React from "react";
import Card from "./card";

type Props = {
  onSelect: (id: number) => void;
  options: (typeof challengeOptions.$inferSelect)[];
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

const Challenge = ({
  options,
  status,
  disabled,
  type,
  selectedOption,
  onSelect,
}: Props) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      )}
    >
      {options.map((option, i) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          audioSrc={option.audioSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
};

export default Challenge;
