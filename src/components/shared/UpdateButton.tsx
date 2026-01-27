import type { Dispatch, SetStateAction } from "react";
import { useContext } from "react";
import { FormContext } from "../../contexts/formContext";
import { createPortal } from "react-dom";
import { Toast } from "../Toast";

type Props = {
  commentId: number;
  replyId?: number;
  text: string;
  oldText: string;
  setText: Dispatch<SetStateAction<string>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
};
import { useCommentsStore } from "../../hooks/useCommentsStore";

export const UpdateButton = ({
  commentId,
  replyId,
  text,
  oldText,
  setText,
  setEditing,
}: Props) => {
  const { updateComment, updateReply } = useCommentsStore();

  const { setWarningMessage, warningMessage } = useContext(FormContext);

  const handleUpdate = () => {
    if (text.trim() === "") {
      setWarningMessage("Comments must be unempty");
      return;
    }

    if (text.length > 900) {
      setWarningMessage("Comments should be shorter");
      return;
    }

    if (replyId) {
      updateReply({ commentId, replyId, text, oldText, setText });
      setEditing(false);
      return;
    }

    updateComment({ commentId, text, oldText, setText });
    setEditing(false);
  };

  return (
    <>
      <button
        className="bg-(--purple-600) border rounded-md h-10 px-6 text-white cursor-pointer active:opacity-50 font-medium"
        onClick={() => {
          handleUpdate();
        }}
      >
        UPDATE
      </button>
      {warningMessage !== "" &&
        createPortal(
          <Toast type="warning" text={warningMessage}></Toast>,
          document.getElementById("app-wraper") ?? document.body
        )}
    </>
  );
};
