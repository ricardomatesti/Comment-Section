import { useIsMobile } from "../hooks/useIsMobile";
import { Comment } from "./Comment";

type Props = {};

export const CommentSection = ({}: Props) => {
  const { isMobile } = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        <Comment
          text={
            "This is my first comment! This is my first comment! This is my first comment!v This is my first comment! This is my first comment! v v vThis is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!"
          }
          imgUrl={"/avatars/image-amyrobson.png"}
          date={"12-02-2025"}
          userName={"Peter Griffing"}
        ></Comment>

        <div className="flex flex-row">
          <div className="w-[6px] flex-[1 none] bg-gray-300 ml-4 mr-4"></div>
          <div className="flex flex-col gap-4 grow">
            <Comment
              text={
                "This is my first comment! This is my first comment! This is my first comment!v This is my first comment! This is my first comment! v v vThis is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!"
              }
              imgUrl={"/avatars/image-amyrobson.png"}
              date={"12-02-2025"}
              userName={"Peter Griffing"}
              isYours={true}
            ></Comment>
            <Comment
              text={
                "This is my first comment! This is my first comment! This is my first comment!v This is my first comment! This is my first comment! v v vThis is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!"
              }
              imgUrl={"/avatars/image-amyrobson.png"}
              date={"12-02-2025"}
              userName={"Peter Griffing"}
            ></Comment>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Comment
        text={
          "This is my first comment! This is my first comment! This is my first comment!v This is my first comment! This is my first comment! v v vThis is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!"
        }
        imgUrl={"/avatars/image-amyrobson.png"}
        date={"12-02-2025"}
        userName={"Peter Griffing"}
      ></Comment>

      <div className="flex flex-row">
        <div className="w-[2px] flex-[1 none] bg-gray-300 ml-10 mr-10"></div>
        <div className="flex flex-col gap-4 grow">
          <Comment
            text={
              "This is my first comment! This is my first comment! This is my first comment!v This is my first comment! This is my first comment! v v vThis is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!"
            }
            imgUrl={"/avatars/image-amyrobson.png"}
            date={"12-02-2025"}
            userName={"Peter Griffing"}
            isYours={true}
          ></Comment>
          <Comment
            text={
              "This is my first comment! This is my first comment! This is my first comment!v This is my first comment! This is my first comment! v v vThis is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!"
            }
            imgUrl={"/avatars/image-amyrobson.png"}
            date={"12-02-2025"}
            userName={"Peter Griffing"}
          ></Comment>
        </div>
      </div>
    </div>
  );
};
