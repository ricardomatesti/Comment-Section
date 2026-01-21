import { type Dispatch, type SetStateAction } from "react";
import { useCommentsStore } from "../hooks/useCommentsStore";

export const DeleteCommentModal = ({
  onClose,
  commentId,
  replyId,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  commentId: number;
  replyId?: number;
}) => {
  const { deleteComment, deleteReply } = useCommentsStore();

  const handleDelete = () => {
    if (replyId) {
      deleteReply({ parentCommentId: commentId, replyId });
      onClose(false);
      return;
    }
    deleteComment({ commentId });
    onClose(false);
  };

  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-[#00000066] z-20"
      onClick={() => {
        onClose(false);
      }}
    >
      <div
        className="flex flex-col bg-white rounded-xl p-8 w-120 gap-6"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="font-semibold text-3xl text-gray-700">
          Delete comment
        </span>
        <span className="text-gray-500 text-xl">
          Are you sure you want to delete this comment? This will remove the
          comment and this can't be undone.
        </span>
        <div className="flex flex-row gap-4">
          <button
            className="bg-gray-500 text-white w-full rounded-xl text-xl p-4 font-medium opacity-80 active:opacity-100"
            onClick={() => {
              onClose(false);
            }}
          >
            NO, CANCEL
          </button>
          <button
            className="bg-red-500 text-white w-full text-xl rounded-lg p-4 font-medium opacity-80 active:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};
