import { useIsMobile } from "../hooks/useIsMobile";
import { useContext, type FormEvent } from "react";
import { useCommentsStore } from "../hooks/useCommentsStore";
import { UserContext } from "../contexts/userContext";
import { FormContext } from "../contexts/formContext";
import { Toast } from "./Toast";
import { createPortal } from "react-dom";
import { Image } from "./shared/Image";

export const AddCommentSection = () => {
  const { isMobile } = useIsMobile();
  const { user } = useContext(UserContext);
  const { addComment } = useCommentsStore();

  const { text, setText, setWarningMessage, warningMessage } =
    useContext(FormContext);

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
    addComment({ setText, user, text });
  };

  if (isMobile) {
    return (
      <div className="bg-white mt-0 flex-none h-50 rounded-t-md flex flex-col gap-4 p-4 mb-0">
        <form
          className="h-full flex flex-col gap-4"
          onSubmit={(e) => handleSubmit({ e })}
        >
          <textarea
            name="text"
            className="w-full flex-1 resize-none focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-600)] transition-colors outline-none border-gray-200 max-h-40 border border-solid rounded-md py-3 px-4 text-start text-md"
            placeholder="Add a comment..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <div className="flex flex-row justify-between">
            <Image src={user.photo_url}></Image>

            <button
              type="submit"
              className="bg-(--purple-600) border rounded-md h-12 px-6 text-white cursor-pointer active:opacity-50 font-medium"
            >
              SEND
            </button>
          </div>
        </form>
        {warningMessage !== "" &&
          createPortal(
            <Toast type="warning" text={warningMessage}></Toast>,
            document.getElementById("app-wraper") ?? document.body
          )}
      </div>
    );
  }

  return (
    <div className="bg-white mt-0 flex-none h-40 rounded-md flex flex-row gap-4 p-6 mb-4">
      <Image h={12} w={12} src={user.photo_url} />
      <form
        className="w-full gap-4 flex flex-row"
        onSubmit={(e) => handleSubmit({ e })}
      >
        <textarea
          name="text"
          className="w-full resize-none focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-600)] transition-colors outline-none flex-1 border-gray-200 max-h-29 border border-solid rounded-md py-3 px-4 text-start text-md"
          placeholder="Add a comment..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
        <button
          type="submit"
          className="bg-(--purple-600) border rounded-md h-10 px-6 text-white cursor-pointer active:opacity-50 font-medium"
        >
          SEND
        </button>
      </form>
      {warningMessage !== "" &&
        createPortal(
          <Toast type="warning" text={warningMessage}></Toast>,
          document.getElementById("app-wraper") ?? document.body
        )}
    </div>
  );
};
