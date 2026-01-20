import type { Dispatch, SetStateAction } from "react";

type Props = {
  onClick: () => void;
  commentId: number;
  replyId?: number;
  text: string;
  oldText: string;
  setText: Dispatch<SetStateAction<string>>;
};
import { useCommentsStore } from "../../hooks/useCommentsStore";

export const UpdateButton = ({
  onClick,
  commentId,
  replyId,
  text,
  oldText,
  setText,
}: Props) => {
  const { updateComment, updateReply } = useCommentsStore();

  const handleUpdate = () => {
    if (replyId) {
      updateReply({ commentId, replyId, text, oldText, setText });
      return;
    }
    updateComment({ commentId, text, oldText, setText });
  };

  return (
    <button
      className="bg-(--purple-600) border rounded-md h-10 px-6 text-white cursor-pointer active:opacity-50 font-medium"
      onClick={() => {
        onClick();
        handleUpdate();
      }}
    >
      UPDATE
    </button>
  );
};
