import Image from "next/image";
import React from "react";

interface Props {
  question: string;
}

const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="flex items-center mb-6 gap-x-4">
      <Image
        src="/mascot.svg"
        alt="Mascot"
        className="hidden lg:block"
        height={60}
        width={60}
      />
      <Image
        src="/mascot.svg"
        alt="Mascot"
        className="lg:hidden block"
        height={40}
        width={40}
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute top-1/2 -left-3 h-0 w-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};

export default QuestionBubble;
