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

export type Reply = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  user_photo_url: string;
};

export const useComments = function (): {
  comments: CommentType[];
  isLoading: boolean;
} {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error al crear:", error);
      }
    };

    getComments();
  }, []);

  return { comments, isLoading };
};

export const useAddComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: tipar el commentData
  const addComment = async (commentData: any) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return { addComment, loading, error };
};
