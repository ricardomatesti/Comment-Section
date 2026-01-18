import { useEffect, useState } from "react";

export type Comment = {
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
  comments: Comment[];
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
