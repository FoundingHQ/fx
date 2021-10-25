import { useEffect, useRef } from "react";
import { classnames } from "tailwindcss-classnames";
import { FiThumbsUp, FiMessageCircle, FiEye, FiShare } from "react-icons/fi";
import { Card, Button } from "@components";
import { useOnScreen } from "@util/element";
import { Lesson } from "@libs/lessons/data/lessons";

import Stories from "./LessonStory";

type Props = {
  lesson: Lesson;
  currentLessonId?: Lesson["id"];
  onShow?: (lesson: Lesson) => void;
};

export const LessonCard = ({ currentLessonId, lesson, onShow }: Props) => {
  const ref = useRef<HTMLDivElement>();
  const [onScreen] = useOnScreen(ref, "-338px");

  useEffect(() => {
    if (onScreen && onShow) {
      onShow(lesson);
    }
  }, [onScreen]);

  return (
    <Card
      ref={ref}
      className={classnames({
        "opacity-50": currentLessonId !== lesson.id,
      })}
    >
      <header className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full"
            src={lesson.createdBy.photoURL || ""}
            alt={lesson.createdBy.displayName || ""}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            <a href="#" className="hover:underline">
              {lesson.createdBy.displayName}
            </a>
          </p>
          <p className="text-sm text-gray-500">
            {lesson.hashtags.map((hashtag) => (
              <a key={hashtag} href="#" className="mr-1 hover:underline">
                #{hashtag}
              </a>
            ))}
          </p>
        </div>
        <div className="flex self-center flex-shrink-0">
          <Button
            $variant="outline"
            $size="xs"
            className={classnames({
              "opacity-50": lesson.following,
            })}
          >
            {lesson.following ? "Following" : "Follow"}
          </Button>
        </div>
      </header>
      <div className="my-3">
        <Stories
          stories={lesson.stories}
          isPaused={currentLessonId === lesson.id}
          currentIndex={
            currentLessonId === lesson.id ? 0 : lesson.stories.length
          }
        />
      </div>
      <div className="flex justify-between space-x-8">
        <div className="flex space-x-6">
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <FiThumbsUp className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">
                {lesson._likeCount}
              </span>
              <span className="sr-only">likes</span>
            </button>
          </span>
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <FiMessageCircle className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">
                {lesson._commentCount}
              </span>
              <span className="sr-only">replies</span>
            </button>
          </span>
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <FiEye className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">
                {lesson._viewCount}
              </span>
              <span className="sr-only">views</span>
            </button>
          </span>
        </div>
        <div className="flex text-sm">
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <FiShare className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">Share</span>
            </button>
          </span>
        </div>
      </div>
    </Card>
  );
};
