import { FiMessageCircle } from "react-icons/fi";
import { Comment } from "@libs/comments/data/comments";

type Props = {
  comment: Comment;
};

export const LessonComment = ({ comment }: Props) => {
  return (
    <li className="flex py-4 space-x-3">
      <div className="flex-shrink-0">
        <img
          className="w-8 h-8 rounded-full"
          src={comment.createdBy.photoURL || ""}
          alt={comment.createdBy.displayName || ""}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800">{comment.content}</p>
        <div className="flex mt-2">
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <FiMessageCircle className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">Reply</span>
            </button>
          </span>
        </div>
      </div>
    </li>
  );
};
