import { Comment } from "./Comment";
import { AnimatePresence } from "motion/react";
import type { User } from "../hooks/useUsers";
import type { ReplyType } from "../hooks/useCommentsStore";

type RepliesProps = {
  parentCommentId: number;
  isMobile: boolean;
  replies: ReplyType[];
  userSignedUp: User;
};

export const ReplyList = ({
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
                  comment={reply}
                  parentCommentId={parentCommentId}
                  isYours={reply.user === userSignedUp.id}
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
                parentCommentId={parentCommentId}
                comment={reply}
                isYours={reply.user === userSignedUp.id}
              ></Comment>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
