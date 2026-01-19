import { useEffect, useState } from "react";

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
  addComment: (commentData: CommentPayload) => Promise<
    | {
        success: boolean;
        data: any;
        error?: undefined;
      }
    | {
        success: boolean;
        error: string;
        data?: undefined;
      }
  >;
  error: string | null;
  addCommentLoading: boolean;
};

export const useComments = function (): ReturnType {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [addCommentLoading, setAddCommentLoading] = useState(false);
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

  const addComment = async (commentData: CommentPayload) => {
    setAddCommentLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(commentData),
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

  return {
    comments,
    commentsLoading,
    error,
    setComments,
    addComment,
    addCommentLoading,
  };
};
