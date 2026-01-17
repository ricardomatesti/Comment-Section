import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { useIsTextClamped } from "../hooks/useIsTextClamped";
import { Reply } from "./Reply";
import { ReplyButton } from "./shared/ReplyButton";
import { Votes } from "./shared/Votes";
import { ReadMoreButton } from "./shared/ReadMoreButton";
import { formatDateToText } from "../utils/utils";

type Props = {
  text: string;
  imgUrl: string;
  date: string;
  userName: string;
};

export const Comment = ({ text, imgUrl, date, userName }: Props) => {
  const [textExpanded, setTextExpanded] = useState(false);
  const { isClamped, textRef } = useIsTextClamped();
  const { isMobile } = useIsMobile();

  const SPAN_CLASS_NAME = `${
    !textExpanded ? "max-h-30 line-clamp-3" : "max-h-none"
  } text-start text-md  text-gray-500`;

  if (isMobile) {
    return (
      <div className="bg-white min-h-fit-content flex-initial max-h-min flex flex-col rounded-lg gap-4 p-4 relative">
        <div className="flex flex-row justify items-center gap-4">
          <img src={imgUrl} className="w-10 h-10"></img>
          <span className="text-lg font-bold">{userName}</span>
          <span className=" text-gray-500">{formatDateToText({ date })}</span>
        </div>

        <span ref={textRef} className={SPAN_CLASS_NAME}>
          {text}
        </span>
        <div className="flex flex-row justify-end items-end mt-2 mb-0">
          <ReadMoreButton
            isClamped={isClamped}
            setTextExpanded={setTextExpanded}
            textExpanded={textExpanded}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Votes orientation="horizontal"></Votes>
          <ReplyButton></ReplyButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="bg-white min-h-fit-content flex-initial basis-full
 max-h-100 flex flex-row gap-10 rounded-lg p-6 relative"
      >
        <Votes orientation="vertical"></Votes>
        <div className="flex flex-col flex-1 w-100 gap-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify items-center gap-4">
              <img src={imgUrl} className="w-10 h-10"></img>
              <span className="text-lg font-bold">{userName}</span>
              <span className=" text-gray-500">
                {formatDateToText({ date })}
              </span>
            </div>
            <ReplyButton></ReplyButton>
          </div>

          <span ref={textRef} className={SPAN_CLASS_NAME}>
            {text}
          </span>
          <div className="flex flex-row justify-end items-center">
            <ReadMoreButton
              isClamped={isClamped}
              setTextExpanded={setTextExpanded}
              textExpanded={textExpanded}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-[2px] flex-[1 none] bg-gray-300 ml-10 mr-10"></div>
        <div className="flex flex-col gap-4 grow">
          <Reply
            text={
              "This is my first comment! This is my first comment! This is my first comment!v This is my first comment! This is my first comment! v v vThis is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!"
            }
            imgUrl={"/avatars/image-amyrobson.png"}
            date={"12-02-2025"}
            userName={"Peter Griffing"}
          ></Reply>
          <Reply
            text={
              "This is my first comment! This is my first comment! This is my first comment!v This is my first comment! This is my first comment! v v vThis is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!"
            }
            imgUrl={"/avatars/image-amyrobson.png"}
            date={"12-02-2025"}
            userName={"Peter Griffing"}
          ></Reply>
        </div>
      </div>
    </div>
  );
};
