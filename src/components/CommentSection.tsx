import { useContext, useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { Comment } from "./Comment";
import { useCommentsStore } from "../hooks/useCommentsStore";
import { UserContext } from "../contexts/userContext";
import { AnimatePresence } from "motion/react";

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

export const FakeComment = ({
  imgUrl,
  userName,
  isMobile,
}: {
  imgUrl: string;
  userName: string;
  isMobile: boolean;
}) => {
  if (isMobile) {
    return (
      <div className="flex flex-col">
        <div className="bg-white min-h-fit-content flex-initial max-h-min flex flex-col rounded-lg gap-4 p-4 relative">
          <div className="flex flex-row justify items-center gap-4">
            <img src={imgUrl} className="w-10 h-10 rounded-[50%]"></img>
            <div className="flex flex-row items-center gap-2">
              <span className="text-lg  text-gray-500 font-bold line-clamp-1">
                {userName}
              </span>

              <div className="bg-(--purple-600) px-2 py-0 rounded-sm items-center flex flex-row">
                <span className="text-sm text-white">you</span>
              </div>
            </div>
            <span className="text-gray-500">Today</span>
          </div>

          <span
            className={
              "max-h-30 line-clamp-3 text-start text-md  text-gray-500"
            }
          >
            This could be your first comment!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className="bg-white min-h-fit-content flex-initial 
 max-h-100 flex flex-row gap-10 rounded-lg p-6 relative"
      >
        <div className="flex flex-col flex-1 w-100 gap-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify items-center gap-4">
              <img src={imgUrl} className="w-10 h-10 rounded-[50%]"></img>
              <div className="flex flex-row items-center gap-2">
                <span className="text-lg text-gray-500 font-bold line-clamp-1">
                  {userName}
                </span>

                <div className="bg-(--purple-600) px-2 py-0 rounded-sm items-center flex flex-row">
                  <span className="text-sm  text-white">you</span>
                </div>
              </div>
              <span className=" text-gray-500">Today</span>
            </div>
          </div>

          <span
            className={
              "max-h-30 line-clamp-3 text-start text-md  text-gray-500"
            }
          >
            This could be your first comment
          </span>
        </div>
      </div>
    </div>
  );
};
