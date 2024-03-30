import { lessons, units } from "@/db/schema";
import React from "react";
import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";

interface Props {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | null
    | undefined;
  activeLessonPercentage: number;
}

const Unit = ({
  title,
  description,
  id,
  order,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              id={lesson.id}
              unitId={lesson.unitId}
              locked={isLocked}
              current={isCurrent} // Remove the hard coded value
              key={lesson.id}
              index={index}
              percentage={activeLessonPercentage}
              totalCount={lessons.length - 1}
            />
          );
        })}
      </div>
    </>
  );
};

export default Unit;
