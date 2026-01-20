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
import { createPortal } from "react-dom";
import { DeleteCommentModal } from "./DeleteCommentModal";
import { UpdateButton } from "./shared/UpdateButton";
import { CancelButton } from "./shared/CancelButton";

const root = document.getElementById("root");

type Props = {
  id: number;
  parentCommentId?: number;
  text: string;
  imgUrl: string;
  date: string;
  userName: string;
  votes: number;
  isYours?: boolean;
};

export const Comment = ({
  // TODO pasar el comment entero en vez de cada prop xD
  id,
  parentCommentId,
  text,
  imgUrl,
  date,
  userName,
  votes,
  isYours = false,
}: Props) => {
  // TODO mover todos los states estos a un context que esto es feísimo
  const [textExpanded, setTextExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [textEditing, setTextEditing] = useState(text);
  const { isClamped, textRef } = useIsTextClamped(text);
  const { isMobile } = useIsMobile();

  const SPAN_CLASS_NAME = `${
    !textExpanded ? "max-h-30 line-clamp-3" : "max-h-none"
  } text-start text-md  text-gray-500`;

  if (isMobile && editing) {
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

          <textarea
            className="w-full flex-1 border-gray-200 min-h-30 max-h-40 resize-none border border-solid rounded-md py-3 px-4 text-start text-md"
            placeholder="Add a reply..."
            onChange={(e) => setTextEditing(e.target.value)}
            value={textEditing}
          ></textarea>

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
            <Votes orientation="horizontal" votes={votes}></Votes>
            {!isYours ? (
              <ReplyButton
                replying={replying}
                setReplying={setReplying}
              ></ReplyButton>
            ) : (
              <div className="flex flex-row gap-4">
                <CancelButton
                  onClick={() => {
                    setEditing(false);
                    setTextEditing(text);
                  }}
                ></CancelButton>
                <UpdateButton
                  onClick={() => setEditing(false)}
                  commentId={parentCommentId ? parentCommentId : id}
                  replyId={parentCommentId ? id : undefined}
                  text={textEditing}
                  oldText={text}
                  setText={setTextEditing}
                ></UpdateButton>
              </div>
            )}
          </div>
        </div>
        <ReplyToComment
          replying={replying}
          setReplying={setReplying}
          commentId={parentCommentId ? parentCommentId : id}
        ></ReplyToComment>
        {showModal &&
          createPortal(
            <DeleteCommentModal
              commentId={parentCommentId ? parentCommentId : id}
              replyId={parentCommentId ? id : undefined}
              onClose={setShowModal}
            />,
            root ?? document.body
          )}
      </div>
    );
  }

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
            <Votes orientation="horizontal" votes={votes}></Votes>
            {!isYours ? (
              <ReplyButton
                replying={replying}
                setReplying={setReplying}
              ></ReplyButton>
            ) : (
              <div className="flex flex-row gap-4">
                <DeleteButton
                  onClick={() => {
                    setShowModal(true);
                  }}
                ></DeleteButton>
                <EditButton
                  onClick={() => setEditing((prev) => !prev)}
                ></EditButton>
              </div>
            )}
          </div>
        </div>
        <ReplyToComment
          replying={replying}
          setReplying={setReplying}
          commentId={parentCommentId ? parentCommentId : id}
        ></ReplyToComment>
        {showModal &&
          createPortal(
            <DeleteCommentModal
              commentId={parentCommentId ? parentCommentId : id}
              replyId={parentCommentId ? id : undefined}
              onClose={setShowModal}
            />,
            root ?? document.body
          )}
      </div>
    );
  }

  if (editing) {
    return (
      <div className="flex flex-col basis-full">
        <div
          className="bg-white min-h-fit-content flex-initial 
 max-h-100 flex flex-row gap-10 rounded-lg p-6 relative"
        >
          <Votes orientation="vertical" votes={votes}></Votes>
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
                  <DeleteButton
                    onClick={() => setShowModal(true)}
                  ></DeleteButton>
                  <EditButton
                    onClick={() => setEditing((prev) => !prev)}
                  ></EditButton>
                </div>
              )}
            </div>

            <textarea
              className="w-full flex-1 border-gray-200 min-h-35 max-h-40 resize-none border border-solid rounded-md py-3 px-4 text-start text-md"
              placeholder="Add a reply..."
              onChange={(e) => setTextEditing(e.target.value)}
              value={textEditing}
            ></textarea>
            <div className="w-full flex flex-row justify-end gap-4">
              <CancelButton
                onClick={() => {
                  setEditing(false);
                  setTextEditing(text);
                }}
              ></CancelButton>
              <UpdateButton
                onClick={() => setEditing(false)}
                commentId={parentCommentId ? parentCommentId : id}
                replyId={parentCommentId ? id : undefined}
                text={textEditing}
                setText={setTextEditing}
                oldText={text}
              ></UpdateButton>
            </div>
          </div>
        </div>
        <ReplyToComment
          replying={replying}
          setReplying={setReplying}
          commentId={parentCommentId ? parentCommentId : id}
        ></ReplyToComment>
        {showModal &&
          createPortal(
            <DeleteCommentModal
              commentId={parentCommentId ? parentCommentId : id}
              replyId={parentCommentId ? id : undefined}
              onClose={setShowModal}
            />,
            root ?? document.body
          )}
      </div>
    );
  }

  return (
    <div className="flex flex-col basis-full">
      <div
        className="bg-white min-h-fit-content flex-initial 
 max-h-100 flex flex-row gap-10 rounded-lg p-6 relative"
      >
        <Votes orientation="vertical" votes={votes}></Votes>
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
                <DeleteButton onClick={() => setShowModal(true)}></DeleteButton>
                <EditButton
                  onClick={() => setEditing((prev) => !prev)}
                ></EditButton>
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
      <ReplyToComment
        replying={replying}
        setReplying={setReplying}
        commentId={parentCommentId ? parentCommentId : id}
      ></ReplyToComment>
      {showModal &&
        createPortal(
          <DeleteCommentModal
            commentId={parentCommentId ? parentCommentId : id}
            replyId={parentCommentId ? id : undefined}
            onClose={setShowModal}
          />,
          root ?? document.body
        )}
    </div>
  );
};
