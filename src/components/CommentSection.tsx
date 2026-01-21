import { useContext, useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { Comment } from "./Comment";
import { useCommentsStore } from "../hooks/useCommentsStore";
import { UserContext } from "../contexts/userContext";
import { AnimatePresence, motion } from "motion/react";

type User = {
  id: number;
  name: string;
  photo_url: string;
  email: string;
};

export const CommentSection = () => {
  const { isMobile } = useIsMobile();
  const { user: userSignedUp } = useContext(UserContext);
  const commentRef = useRef<HTMLDivElement>(null);
  const { comments, commentToScrollId, scrollToComment } = useCommentsStore();

  useEffect(() => {
    if (commentToScrollId) {
      scrollToComment({ commentRef });
    }
  }, [comments]);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto basis-full [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)]">
        <div className="w-full min-h-16"></div>
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div
                className="flex flex-col gap-4"
                key={comment.id}
                ref={comment.id === commentToScrollId ? commentRef : null}
              >
                <Comment
                  id={comment.id}
                  text={comment.text}
                  imgUrl={comment.user_photo_url}
                  date={comment.date}
                  userName={comment.user_name}
                  votes={comment.votes}
                  isYours={comment.user === userSignedUp.id}
                  optimisticComment={comment.optimistic_comment}
                ></Comment>
                <RepliesToThisComment
                  parentCommentId={comment.id}
                  isMobile={isMobile}
                  replies={comment.replies}
                  userSignedUp={userSignedUp}
                ></RepliesToThisComment>
              </div>
            );
          })}
        <div className="mt-4"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto basis-full [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)] ">
      <div className="w-full min-h-16"></div>
      <AnimatePresence>
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div
                className="flex flex-col gap-4"
                key={comment.id}
                ref={comment.id === commentToScrollId ? commentRef : null}
              >
                <Comment
                  id={comment.id}
                  text={comment.text}
                  imgUrl={comment.user_photo_url}
                  date={comment.date}
                  userName={comment.user_name}
                  votes={comment.votes}
                  isYours={comment.user === userSignedUp.id}
                  optimisticComment={comment.optimistic_comment}
                ></Comment>
                <RepliesToThisComment
                  parentCommentId={comment.id}
                  isMobile={isMobile}
                  replies={comment.replies}
                  userSignedUp={userSignedUp}
                ></RepliesToThisComment>
              </div>
            );
          })}
      </AnimatePresence>
      <div className="mt-4"></div>
    </div>
  );
};

type RepliesProps = {
  parentCommentId: number;
  isMobile: boolean;
  replies: Reply[];
  userSignedUp: User;
};

type Reply = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  votes: number;
  user_photo_url: string;
  optimistic_comment?: boolean;
};

const RepliesToThisComment = ({
  parentCommentId,
  isMobile,
  replies,
  userSignedUp,
}: RepliesProps) => {
  if (replies.length === 0) return;

  if (isMobile) {
    return (
      <div className="flex flex-row">
        <div className="w-[2px] flex-[1 none] bg-gray-300 ml-4 mr-4"></div>
        <div className="flex flex-col gap-4 grow">
          <AnimatePresence>
            {replies.map((reply) => {
              return (
                <Comment
                  key={reply.id}
                  id={reply.id}
                  parentCommentId={parentCommentId}
                  text={reply.text}
                  imgUrl={reply.user_photo_url}
                  date={reply.date}
                  userName={reply.user_name}
                  votes={reply.votes}
                  isYours={reply.user === userSignedUp.id}
                  optimisticComment={reply.optimistic_comment}
                ></Comment>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <div className="w-[2px] flex-[1 none] bg-gray-300 ml-10 mr-10"></div>
      <div className="flex flex-col gap-4 grow">
        <AnimatePresence>
          {replies.map((reply) => {
            return (
              <Comment
                key={reply.id}
                id={reply.id}
                parentCommentId={parentCommentId}
                text={reply.text}
                imgUrl={reply.user_photo_url}
                date={reply.date}
                userName={reply.user_name}
                votes={reply.votes}
                isYours={reply.user === userSignedUp.id}
                optimisticComment={reply.optimistic_comment}
              ></Comment>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
