import { useContext, useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { Comment, FakeComment, SkeletonComment } from "./Comment";
import { useCommentsStore } from "../hooks/useCommentsStore";
import { UserContext } from "../contexts/userContext";
import { AnimatePresence } from "motion/react";
import { Toast } from "./Toast";
import { createPortal } from "react-dom";
import { ReplyList } from "./ReplyList";

export const CommentSection = () => {
  const { isMobile } = useIsMobile();
  const { user: userSignedUp } = useContext(UserContext);
  const commentRef = useRef<HTMLDivElement>(null);
  const {
    comments,
    commentToScrollId,
    scrollToComment,
    error,
    commentsLoading,
  } = useCommentsStore();

  useEffect(() => {
    if (commentToScrollId) {
      scrollToComment({ commentRef });
    }
  }, [comments]);

  if (commentsLoading) {
    return (
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto basis-full [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)] ">
        <div className="w-full min-h-16"></div>
        <div className="flex flex-col gap-4">
          <SkeletonComment
            textSkeletonHeight={isMobile ? 25 : 35}
          ></SkeletonComment>
          <div className="flex flex-row">
            <div className="w-[2px] flex-[1 none] bg-gray-300 ml-4 mr-4"></div>
            <div className="flex flex-col gap-4 grow">
              <SkeletonComment textSkeletonHeight={10}></SkeletonComment>
            </div>
          </div>
        </div>
        <SkeletonComment textSkeletonHeight={25}></SkeletonComment>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col gap-4 min-h-0 h-full justify-center overflow-y-auto [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)]">
        <div className="w-full min-h-16"></div>
        <span className="text-3xl font-medium text-(--purple-400) ">
          No comments here yet... Be the first one!
        </span>
        <div className="opacity-50">
          <FakeComment
            imgUrl={userSignedUp.photo_url}
            userName={userSignedUp.name}
            isMobile={isMobile}
          ></FakeComment>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto basis-full [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)]">
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
                    comment={comment}
                    isYours={comment.user === userSignedUp.id}
                  ></Comment>
                  <ReplyList
                    parentCommentId={comment.id}
                    isMobile={isMobile}
                    replies={comment.replies}
                    userSignedUp={userSignedUp}
                  ></ReplyList>
                </div>
              );
            })}
        </AnimatePresence>
        <div className="mt-4"></div>
        {error &&
          error !== "" &&
          createPortal(
            <Toast type="error" text={error}></Toast>,
            document.getElementById("app-wraper") ?? document.body
          )}
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
                  comment={comment}
                  isYours={comment.user === userSignedUp.id}
                ></Comment>
                <ReplyList
                  parentCommentId={comment.id}
                  isMobile={isMobile}
                  replies={comment.replies}
                  userSignedUp={userSignedUp}
                ></ReplyList>
              </div>
            );
          })}
      </AnimatePresence>
      <div className="mt-4"></div>
      {error &&
        error !== "" &&
        createPortal(
          <Toast type="error" text={error}></Toast>,
          document.getElementById("app-wraper") ?? document.body
        )}
    </div>
  );
};
