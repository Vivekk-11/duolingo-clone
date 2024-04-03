"use client";

import React, { useEffect, useState, useTransition } from "react";
import { challengeOptions, challenges } from "@/db/schema";
import Header from "./header";
import Confetti from "react-confetti";
import QuestionBubble from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";
import { updateChallengeProgress } from "@/actions/update-challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize } from "react-use";
import Image from "next/image";
import ResultCard from "./result-card";
import { useRouter } from "next/navigation";
import useHeartsModal from "@/hooks/use-hearts-modal";

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
  const { open: openHeartsModal } = useHeartsModal();
  const { height, width } = useWindowSize();
  const [finishAudio, _, finishControls] = useAudio({ src: "/finish.mp3" });
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const router = useRouter();
  const [lessonId] = useState(initialLessonId);
  const [pending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none");
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const currentChallenge = challenges[activeIndex];

  useEffect(() => {
    if (!currentChallenge) {
      finishControls.play();
    }
  }, [currentChallenge]);

  if (!currentChallenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          height={height}
          width={width}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }

  const title =
    currentChallenge.type === "ASSIST"
      ? "Select the correct meaning:-"
      : currentChallenge.question;

  const currentChallengeOptions = currentChallenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = currentChallengeOptions.find(
      (option) => option.correct
    );

    if (!correctOption) return;
    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        updateChallengeProgress(currentChallenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();

            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => {
            toast.error("Something went wrong, please try again!");
          });
      });
    } else {
      startTransition(() => {
        reduceHearts(currentChallenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            incorrectControls.play();
            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong, please try again!"));
      });
    }
  };

  return (
    <>
      {correctAudio}
      {incorrectAudio}
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
                disabled={pending}
                status={status}
                type={currentChallenge.type}
                selectedOption={selectedOption}
                onSelect={onSelect}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={() => onContinue()}
      />
    </>
  );
};

export default Quiz;
