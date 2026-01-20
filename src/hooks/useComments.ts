import { useEffect, useState, useRef } from "react";
import { type User } from "./useUsers";

export type CommentType = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  user_photo_url: string;
  replies: Reply[];
};

type CommentPayload = {
  text: string;
  replies: [];
  user_photo_url: string;
  user_name: string;
  user: number;
};

export type Reply = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  user_photo_url: string;
};

type ReturnType = {
  comments: CommentType[];
  commentsLoading: boolean;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  addComment: ({
    setText,
    user,
    text,
  }: {
    setText: any;
    user: User;
    text: string;
  }) => Promise<void>;
  error: string | null;
  addCommentLoading: boolean;
  commentToScrollId: number | undefined;
  commentRef: React.RefObject<HTMLDivElement | null>;
};

// DEPRECATED
export const useComments = function (): ReturnType {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentToScrollId, setCommentToScrollId] = useState<
    number | undefined
  >(undefined);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [addReplyLoading, setAddReplyLoading] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getComments = async function () {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/comment/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Si metemos autenticación, aquí iría el Token
          },
        });

        const data = await response.json();

        setComments(data);
        setCommentsLoading(false);
      } catch (error) {
        console.error("Error al crear:", error);
      }
    };

    getComments();
  }, []);

  const addCommentToDatabase = async (commentPayload: CommentPayload) => {
    setAddCommentLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(commentPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData) || "Error adding comment");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      let mensajeError = "Unknown Error";

      if (err instanceof Error) {
        mensajeError = err.message;
      } else if (typeof err === "string") {
        mensajeError = err;
      }

      setError(mensajeError);
      return { success: false, error: mensajeError };
    } finally {
      setAddCommentLoading(false);
    }
  };

  // TODO tipar el setText
  const addComment = async ({
    setText,
    user,
    text,
  }: {
    setText: any;
    user: User;
    text: string;
  }) => {
    const optimisticComment: CommentType = {
      id: Date.now(), // ID temporal
      text: text,
      date: Date(),
      replies: [],
      user_photo_url: user.photo_url,
      user_name: user.name,
      user: user.id,
    };

    setComments((prev) => [...prev, optimisticComment]);

    setText("");

    const res = await addCommentToDatabase({
      text: text,
      replies: [],
      user_photo_url: user.photo_url,
      user_name: user.name,
      user: user.id,
    });

    if (res.success) {
      setCommentToScrollId(res.data.id);
      setComments((prev) => {
        return [...prev.slice(0, -1), res.data];
      });
      scrollToComment();
    } else {
      setComments((prev) => [...prev.slice(0, -1), res.data]);
      setText(text); //si el enviar comentario falla que no tenga que escribir el comentario de nuevo
      // TODO: Añadir aviso de que no se pudo guardar el comentario
    }
  };

  const addReplyToDatabase = async (replyPayload: CommentPayload) => {
    setAddReplyLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reply/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(replyPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData) || "Error adding comment");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      let mensajeError = "Unknown Error";

      if (err instanceof Error) {
        mensajeError = err.message;
      } else if (typeof err === "string") {
        mensajeError = err;
      }

      setError(mensajeError);
      return { success: false, error: mensajeError };
    } finally {
      setAddReplyLoading(false);
    }
  };

  const scrollToComment = () => {
    commentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return {
    comments,
    commentsLoading,
    error,
    setComments,
    addComment,
    addCommentLoading,
    commentToScrollId,
    commentRef,
  };
};
