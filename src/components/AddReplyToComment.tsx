import { useIsMobile } from "../hooks/useIsMobile";
import { useContext, type FormEvent } from "react";
import { useCommentsStore } from "../hooks/useCommentsStore";
import { UserContext } from "../contexts/userContext";
import { FormContext } from "../contexts/formContext";
import { Image } from "./shared/Image";

export const AddReplyToComment = ({
  commentId,
  replying,
  setReplying,
}: {
  commentId: number;
  replying: boolean;
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isMobile } = useIsMobile();
  const { addReply } = useCommentsStore();
  const { user } = useContext(UserContext);

  const { text, setText, setWarningMessage } = useContext(FormContext);

  const handleSubmit = ({ e }: { e: FormEvent }) => {
    e.preventDefault();
    if (text.trim() === "") {
      setWarningMessage("Comments must be unempty");
      return;
    }
    if (text.length > 900) {
      setWarningMessage("Comments should be shorter");
      return;
    }
    addReply({ setText, user, text, commentId, setReplying });
  };

  if (!replying) return;

  if (isMobile) {
    return (
      <div className="bg-white mt-2 flex-initial h-50 rounded-md flex flex-col gap-4 p-4">
        <form
          className="h-full flex flex-col gap-4"
          onSubmit={(e) => handleSubmit({ e })}
        >
          <textarea
            className="w-full flex-1 resize-none focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-600)] transition-colors outline-none border-gray-200 max-h-40 border border-solid rounded-md py-3 px-4 text-start text-md "
            placeholder="Add a reply..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <div className="flex flex-row justify-between">
            <Image src={user.photo_url}></Image>

            <button
              className="bg-(--purple-600) font-medium border rounded-md h-12 px-6 text-white cursor-pointer active:opacity-50"
              type="submit"
            >
              REPLY
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white mt-2 flex-initial h-40 rounded-md flex flex-row gap-4 p-6">
      <Image src={user.photo_url}></Image>
      <form
        className="w-full gap-4 flex flex-row"
        onSubmit={(e) => handleSubmit({ e })}
      >
        <textarea
          className="w-full flex-1 border-gray-200 resize-none focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-600)] transition-colors outline-none max-h-29 border border-solid rounded-md py-3 px-4 text-start text-md"
          placeholder="Add a reply..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
        <button
          className="bg-(--purple-600) font-medium border rounded-md h-10 px-6 text-white cursor-pointer active:opacity-50"
          type="submit"
        >
          REPLY
        </button>
      </form>
    </div>
  );
};
