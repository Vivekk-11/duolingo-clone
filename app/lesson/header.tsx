import { Progress } from "@/components/ui/progress";
import useExitModal from "@/hooks/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
}

const Header = ({ hearts, percentage, hasActiveSubscription }: Props) => {
  const { open } = useExitModal();
  return (
    <header className="w-full lg:pt-[50px] pt-[20px] px-10 flex items-center justify-between mx-auto max-w-[1140px] gap-x-7">
      <X
        onClick={open}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="text-rose-500 font-bold flex items-center">
        <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Height"
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="stroke-[3] h-6 w-6 shrink-0" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};

export default Header;
