import { useState, useEffect } from "react";
import { SEO, MainLayout, List, Heading } from "@components";
import { lessons as lessonData, Lesson } from "@libs/lessons/data/lessons";
import { LessonCard } from "@libs/lessons/components/LessonCard";
import { comments as commentData, Comment } from "@libs/comments/data/comments";
import { LessonComment } from "@libs/comments/components/LessonComment";

const Aside = ({
  loading,
  comments,
}: {
  loading: boolean;
  comments: Comment[];
}) => {
  return (
    <section aria-labelledby="comments-section" className="my-6 overflow-auto">
      <Heading
        id="comments-section"
        className="sticky top-0 pb-2 mb-0 text-lg bg-gradient-to-b from-white"
      >
        Comments
      </Heading>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <List role="list">
          {comments.map((comment) => (
            <LessonComment key={comment.id} comment={comment} />
          ))}
        </List>
      )}
    </section>
  );
};

export const HomePage = () => {
  const [currentLessonId, setCurrentLessonId] = useState<string>();
  const [lessonsLoading, setLessonsLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadLessons = () => {
    setLessonsLoading(true);
    setTimeout(() => {
      setLessons(lessonData);
      setCurrentLessonId(lessonData[0].id);
      setLessonsLoading(false);
    }, 100);
  };

  const onLessonShow = (lesson: Lesson) => {
    setCurrentLessonId(lesson.id);
  };

  const loadComments = (lessonId: string) => {
    console.log("load comments for lesson:", lessonId);
    setCommentsLoading(true);
    setTimeout(() => {
      setComments(commentData);
      setCommentsLoading(false);
    }, 100);
  };

  useEffect(() => {
    loadLessons();
  }, []);

  useEffect(() => {
    if (currentLessonId) {
      loadComments(currentLessonId);
    }
  }, [currentLessonId]);

  return (
    <>
      <SEO />
      <MainLayout
        title={<Heading>Home</Heading>}
        aside={<Aside comments={comments} loading={commentsLoading} />}
      >
        {lessonsLoading ? (
          <div>Loading...</div>
        ) : (
          <ul role="list">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onShow={onLessonShow}
                currentLessonId={currentLessonId}
              />
            ))}
          </ul>
        )}
      </MainLayout>
    </>
  );
};

export default HomePage;
