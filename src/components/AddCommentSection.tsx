import { useIsMobile } from "../hooks/useIsMobile";
import { useComments, type CommentType } from "../hooks/useComments";
import { useState, type FormEvent } from "react";

type User = {
  id: number;
  name: string;
  photo_url: string;
  email: string;
};

type Props = {
  user: User;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  scrollToLastComment: () => void;
};

export const AddCommentSection = ({
  user,
  setComments,
  scrollToLastComment,
}: Props) => {
  const { isMobile } = useIsMobile();
  const { addComment, addCommentLoading, error } = useComments();
  const [text, setText] = useState("");

  const addOptimisticComment = async ({
    e,
  }: {
    e: FormEvent<HTMLFormElement>;
  }) => {
    e.preventDefault();
    setText("");

    const optimisticComment = {
      id: Date.now(), // ID temporal
      text: text,
      date: Date(),
      replies: [],
      user_photo_url: user.photo_url,
      user_name: user.name,
      user: user.id,
    };

    setComments((prev) => [...prev, optimisticComment]);

    const res = await addComment({
      text: text,
      replies: [],
      user_photo_url: user.photo_url,
      user_name: user.name,
      user: user.id,
    });

    if (res.success) {
      setComments((prev) => [...prev.slice(0, -1), res.data]);
      scrollToLastComment();
    } else {
      setComments((prev) => [...prev.slice(0, -1), res.data]);
      setText(text); //si el enviar comentario falla que no tenga que escribir el comentario de nuevo
      // TODO: Añadir aviso de que no se pudo guardar el comentario
    }
  };

  if (isMobile) {
    return (
      <div className="bg-white mt-0 flex-none h-50 rounded-md flex flex-col gap-4 p-4 mb-4">
        <form
          className="h-full flex flex-col gap-4"
          onSubmit={(e) => addOptimisticComment({ e })}
        >
          <textarea
            name="text"
            className="w-full flex-1 border-gray-200 max-h-40 border border-solid rounded-md py-3 px-4 text-start text-md"
            placeholder="Add a comment..."
            onChange={(e) => setText(e.target.value)}
            value={text}
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
        onSubmit={(e) => addOptimisticComment({ e })}
      >
        <textarea
          name="text"
          className="w-full flex-1 border-gray-200 max-h-29 border border-solid rounded-md py-3 px-4 text-start text-md"
          placeholder="Add a comment..."
          onChange={(e) => setText(e.target.value)}
          value={text}
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
