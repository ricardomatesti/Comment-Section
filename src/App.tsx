import "./App.css";

import { CommentSection } from "./components/CommentSection.js";
import { AddCommentSection } from "./components/AddCommentSection.js";
import { useUser } from "./hooks/useUser.js";
import { useAddComment, useComments } from "./hooks/useComments";
import { useEffect, useState, type FormEvent } from "react";

function App() {
  const userSignedUp = useUser();
  const { comments: initialComments, isLoading } = useComments();
  const [comments, setComments] = useState(initialComments);
  const { addComment, loading, error } = useAddComment();

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const addOptimisticComment = async ({
    event,
    text,
    setText,
  }: {
    event: FormEvent;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    event.preventDefault();
    setText("");

    const optimisticComment = {
      id: Date.now(), // ID temporal
      text: text,
      date: Date(),
      replies: [],
      user_photo_url: userSignedUp.photo_url,
      user_name: userSignedUp.name,
      user: userSignedUp.id,
    };

    setComments((prev) => [...prev, optimisticComment]);

    const res = await addComment({
      text: text,
      replies: [],
      user_photo_url: userSignedUp.photo_url,
      user_name: userSignedUp.name,
      user: userSignedUp.id,
    });

    if (res.success) {
      setComments((prev) => [...prev.slice(0, -1), res.data]);
    } else {
      setComments((prev) => [...prev.slice(0, -1), res.data]);
      setText(text); //si el enviar comentario falla que no tenga que escribir el comentario de nuevo
      // TODO: Añadir aviso de que no se pudo guardar el comentario
    }
  };

  return (
    <>
      <main className="w-full flex flex-row justify-center items-center">
        <div className="max-w-200 flex-initial w-full h-[100vh] flex flex-col justify-between gap-0 mx-4 overflow-hidden">
          <CommentSection
            userSignedUp={userSignedUp}
            comments={comments}
          ></CommentSection>

          <AddCommentSection
            user={userSignedUp}
            onSubmit={addOptimisticComment}
          ></AddCommentSection>
        </div>
      </main>
    </>
  );
}

export default App;
