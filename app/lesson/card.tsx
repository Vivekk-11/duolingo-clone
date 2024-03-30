import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  id: number;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  shortcut: string;
  text: string;
  imageSrc: string | null;
  audioSrc: string | null;
  type: (typeof challenges.$inferSelect)["type"];
  status: "correct" | "wrong" | "none";
};

const Card = ({
  id,
  selected,
  disabled,
  shortcut,
  text,
  imageSrc,
  audioSrc,
  type,
  status,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() => {}}
      className={cn(
        "border-2 border-b-4 active:border-b-2 h-full rounded-xl hover:bg-black/5 p-4 lg:p-6 cursor-pointer",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected &&
          status === "wrong" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square mb-4 w-full max-h-[80px] lg:max-h-[150px]">
          <Image src={imageSrc} alt={text} fill />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />}
        <p
          className={cn(
            "text-neutral-600 text-sm lg:text-base",
            selected && "text-sky-500",
            selected && status === "correct" && "text-green-500",
            selected && status === "wrong" && "text-rose-500"
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-2xl text-neutral-400 text-xs font-semibold lg:text-[15px]",
            selected && "border-sky-500 text-sky-500",
            selected && status === "correct" && "border-green-500 text-green-500",
            selected && status === "wrong" && "border-rose-500 text-rose-500"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};

export default Card;
