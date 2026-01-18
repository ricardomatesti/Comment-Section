import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { useIsTextClamped } from "../hooks/useIsTextClamped";
import { ReplyButton } from "./shared/ReplyButton";
import { Votes } from "./shared/Votes";
import { ReadMoreButton } from "./shared/ReadMoreButton";
import { formatDateToText } from "../utils/utils";
import { ReplyToComment } from "./ReplyToComment";
import { DeleteButton } from "./shared/DeleteButton";
import { EditButton } from "./shared/EditButton";

type Props = {
  text: string;
  imgUrl: string;
  date: string;
  userName: string;
  isYours?: boolean;
};

export const Comment = ({
  text,
  imgUrl,
  date,
  userName,
  isYours = false,
}: Props) => {
  const [textExpanded, setTextExpanded] = useState(false);
  const [replying, setReplying] = useState(false);
  const { isClamped, textRef } = useIsTextClamped(text);
  const { isMobile } = useIsMobile();

  const SPAN_CLASS_NAME = `${
    !textExpanded ? "max-h-30 line-clamp-3" : "max-h-none"
  } text-start text-md  text-gray-500`;

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <div className="bg-white min-h-fit-content flex-initial max-h-min flex flex-col rounded-lg gap-4 p-4 relative">
          <div className="flex flex-row justify items-center gap-4">
            <img src={imgUrl} className="w-10 h-10 rounded-[50%]"></img>
            <div className="flex flex-row items-center gap-2">
              <span className="text-lg font-bold line-clamp-1">{userName}</span>
              {isYours && (
                <div className="bg-(--purple-600) px-2 py-0 rounded-sm items-center flex flex-row">
                  <span className="text-sm  text-white">you</span>
                </div>
              )}
            </div>
            <span className=" text-gray-500">{formatDateToText({ date })}</span>
          </div>

          <span ref={textRef} className={SPAN_CLASS_NAME}>
            {text}
          </span>
          {isClamped && (
            <div className="flex flex-row justify-end items-end mt-2 mb-0">
              <ReadMoreButton
                isClamped={isClamped}
                setTextExpanded={setTextExpanded}
                textExpanded={textExpanded}
              />
            </div>
          )}
          <div className="flex flex-row justify-between">
            <Votes orientation="horizontal"></Votes>
            {!isYours ? (
              <ReplyButton
                replying={replying}
                setReplying={setReplying}
              ></ReplyButton>
            ) : (
              <div className="flex flex-row gap-4">
                <DeleteButton></DeleteButton>
                <EditButton></EditButton>
              </div>
            )}
          </div>
        </div>
        {replying && <ReplyToComment></ReplyToComment>}
      </div>
    );
  }

  return (
    <div className="flex flex-col basis-full">
      <div
        className="bg-white min-h-fit-content flex-initial 
 max-h-100 flex flex-row gap-10 rounded-lg p-6 relative"
      >
        <Votes orientation="vertical"></Votes>
        <div className="flex flex-col flex-1 w-100 gap-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify items-center gap-4">
              <img src={imgUrl} className="w-10 h-10 rounded-[50%]"></img>
              <div className="flex flex-row items-center gap-2">
                <span className="text-lg font-bold line-clamp-1">
                  {userName}
                </span>
                {isYours && (
                  <div className="bg-(--purple-600) px-2 py-0 rounded-sm items-center flex flex-row">
                    <span className="text-sm  text-white">you</span>
                  </div>
                )}
              </div>
              <span className=" text-gray-500">
                {formatDateToText({ date })}
              </span>
            </div>
            {!isYours ? (
              <ReplyButton
                replying={replying}
                setReplying={setReplying}
              ></ReplyButton>
            ) : (
              <div className="flex flex-row gap-4">
                <DeleteButton></DeleteButton>
                <EditButton></EditButton>
              </div>
            )}
          </div>

          <span ref={textRef} className={SPAN_CLASS_NAME}>
            {text}
          </span>
          {isClamped && (
            <div className="flex flex-row justify-end items-center">
              <ReadMoreButton
                isClamped={isClamped}
                setTextExpanded={setTextExpanded}
                textExpanded={textExpanded}
              />
            </div>
          )}
        </div>
      </div>
      {replying && <ReplyToComment></ReplyToComment>}
    </div>
  );
};
