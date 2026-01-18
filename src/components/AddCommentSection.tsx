import { useIsMobile } from "../hooks/useIsMobile";
import { useState, type FormEvent } from "react";

type User = {
  id: number;
  name: string;
  photo_url: string;
  email: string;
};

type Props = {
  user: User;
  onSubmit: ({
    event,
    text,
    setText,
  }: {
    event: FormEvent;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
  }) => Promise<void>;
};

export const AddCommentSection = ({ user, onSubmit }: Props) => {
  const { isMobile } = useIsMobile();
  const [text, setText] = useState("");

  if (isMobile) {
    return (
      <div className="bg-white mt-0 flex-none h-50 rounded-md flex flex-col gap-4 p-4 mb-4">
        <form
          className="h-full flex flex-col gap-4"
          onSubmit={(e) => onSubmit({ event: e, text, setText })}
        >
          <textarea
            className="w-full flex-1 border-gray-200 max-h-40 border border-solid rounded-md py-3 px-4 text-start text-md"
            placeholder="Add a comment..."
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="flex flex-row justify-between">
            <img src={user.photo_url} className="w-10 h-10 rounded-[50%]"></img>

            <button
              type="submit"
              className="bg-(--purple-600) border rounded-md h-12 px-6 text-white cursor-pointer active:opacity-50"
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white mt-0 flex-none h-40 rounded-md flex flex-row gap-4 p-6 mb-4">
      <img src={user.photo_url} className="w-12 h-12 rounded-[50%]"></img>
      <form
        className="w-full gap-4 flex flex-row"
        onSubmit={(e) => onSubmit({ event: e, text, setText })}
      >
        <textarea
          name="text"
          className="w-full flex-1 border-gray-200 max-h-29 border border-solid rounded-md py-3 px-4 text-start text-md"
          placeholder="Add a comment..."
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-(--purple-600) border rounded-md h-10 px-6 text-white cursor-pointer active:opacity-50"
        >
          SEND
        </button>
      </form>
    </div>
  );
};
