"use client";

import React, { useState } from "react";
import { challengeOptions, challenges } from "@/db/schema";
import Header from "./header";
import QuestionBubble from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";

interface Props {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: any;
}

const Quiz = ({
  initialLessonId,
  initialHearts,
  initialPercentage,
  userSubscription,
  initialLessonChallenges,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [selectionOption, setSelectionOption] = useState<number>();
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none");
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectionOption(id);
  };

  const currentChallenge = challenges[activeIndex];
  const title =
    currentChallenge.type === "ASSIST"
      ? "Select the correct meaning:-"
      : currentChallenge.question;

  const currentChallengeOptions = currentChallenge?.challengeOptions ?? [];

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {currentChallenge.type === "ASSIST" && (
                <QuestionBubble question={currentChallenge.question} />
              )}
              <Challenge
                options={currentChallengeOptions}
                disabled={false}
                status={status}
                type={currentChallenge.type}
                selectedOption={selectionOption}
                onSelect={onSelect}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer disabled={!selectionOption} status={status} onCheck={() => {}} />
    </>
  );
};

export default Quiz;
