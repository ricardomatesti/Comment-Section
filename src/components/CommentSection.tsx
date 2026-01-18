import { useIsMobile } from "../hooks/useIsMobile";
import { Comment } from "./Comment";
import { useComments } from "../hooks/useComments";

type Props = {};

export const CommentSection = ({}: Props) => {
  const { isMobile } = useIsMobile();
  const { comments, isLoading } = useComments();

  if (isMobile) {
    return (
      <>
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div className="flex flex-col gap-4" key={comment.id}>
                <Comment
                  text={comment.text}
                  imgUrl={comment.user_photo_url}
                  date={comment.date}
                  userName={comment.user_name}
                ></Comment>
                <RepliesToThisComment
                  isMobile={isMobile}
                  replies={comment.replies}
                ></RepliesToThisComment>
              </div>
            );
          })}
      </>
    );
  }

  return (
    <>
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <div className="flex flex-col gap-4" key={comment.id}>
              <Comment
                text={comment.text}
                imgUrl={comment.user_photo_url}
                date={comment.date}
                userName={comment.user_name}
              ></Comment>
              <RepliesToThisComment
                isMobile={isMobile}
                replies={comment.replies}
              ></RepliesToThisComment>
            </div>
          );
        })}
    </>
  );
};

type RepliesProps = { isMobile: boolean; replies: Reply[] };

type Reply = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  user_photo_url: string;
};

const RepliesToThisComment = ({ isMobile, replies }: RepliesProps) => {
  if (isMobile) {
    return (
      <div className="flex flex-row">
        <div className="w-[6px] flex-[1 none] bg-gray-300 ml-4 mr-4"></div>
        <div className="flex flex-col gap-4 grow">
          {replies.map((reply) => {
            return (
              <Comment
                key={reply.id}
                text={reply.text}
                imgUrl={reply.user_photo_url}
                date={reply.date}
                userName={reply.user_name}
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
            ></Comment>
          );
        })}
      </div>
    </div>
  );
};
