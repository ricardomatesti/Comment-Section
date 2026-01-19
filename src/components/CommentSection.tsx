import type { CommentType } from "../hooks/useComments";
import { useIsMobile } from "../hooks/useIsMobile";
import { Comment } from "./Comment";

type User = {
  id: number;
  name: string;
  photo_url: string;
  email: string;
};

type Props = {
  userSignedUp: User;
  comments: CommentType[];
  lastCommentRef: React.Ref<HTMLDivElement> | undefined; // TODO tipar
};

export const CommentSection = ({
  userSignedUp,
  comments,
  lastCommentRef,
}: Props) => {
  const { isMobile } = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto basis-full [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)]">
        {comments.length > 0 &&
          comments.map((comment, index) => {
            return (
              <div
                className="flex flex-col gap-4"
                key={comment.id}
                ref={index === comments.length - 1 ? lastCommentRef : null}
              >
                <Comment
                  text={comment.text}
                  imgUrl={comment.user_photo_url}
                  date={comment.date}
                  userName={comment.user_name}
                  isYours={comment.user === userSignedUp.id}
                ></Comment>
                <RepliesToThisComment
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
    <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto basis-full [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)]">
      {comments.length > 0 &&
        comments.map((comment, index) => {
          return (
            <div
              className="flex flex-col gap-4"
              key={comment.id}
              ref={index === comments.length - 1 ? lastCommentRef : null}
            >
              <Comment
                text={comment.text}
                imgUrl={comment.user_photo_url}
                date={comment.date}
                userName={comment.user_name}
                isYours={comment.user === userSignedUp.id}
              ></Comment>
              <RepliesToThisComment
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
};

type RepliesProps = { isMobile: boolean; replies: Reply[]; userSignedUp: User };

type Reply = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  user_photo_url: string;
};

const RepliesToThisComment = ({
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
          {replies.map((reply) => {
            return (
              <Comment
                key={reply.id}
                text={reply.text}
                imgUrl={reply.user_photo_url}
                date={reply.date}
                userName={reply.user_name}
                isYours={reply.user === userSignedUp.id}
              ></Comment>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <div className="w-[2px] flex-[1 none] bg-gray-300 ml-10 mr-10"></div>
      <div className="flex flex-col gap-4 grow">
        {replies.map((reply) => {
          return (
            <Comment
              key={reply.id}
              text={reply.text}
              imgUrl={reply.user_photo_url}
              date={reply.date}
              userName={reply.user_name}
              isYours={reply.user === userSignedUp.id}
            ></Comment>
          );
        })}
      </div>
    </div>
  );
};
