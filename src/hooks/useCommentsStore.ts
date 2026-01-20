import { type User } from "./useUsers";
import { create } from "zustand";

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

interface CommentsState {
  comments: CommentType[];
  commentsLoading: boolean;
  addCommentLoading: boolean;
  error: string | null;
  commentToScrollId: number | undefined;

  // Acciones
  fetchComments: () => Promise<void>;
  addComment: (params: {
    setText: (t: string) => void;
    user: User;
    text: string;
  }) => Promise<void>;
  scrollToComment: ({
    commentRef,
  }: {
    commentRef: React.RefObject<HTMLDivElement | null>;
  }) => void;
}

export const useCommentsStore = create<CommentsState>((set, get) => ({
  comments: [],
  commentsLoading: false,
  addCommentLoading: false,
  error: null,
  commentToScrollId: undefined,

  fetchComments: async () => {
    set({ commentsLoading: true });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/comment/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Si metemos autenticación, aquí iría el Token
        },
      });

      const data = await response.json();

      set({ comments: data, commentsLoading: false });
    } catch (error) {
      console.error("Error al crear:", error);
      set({ error: "Error al cargar comentarios", commentsLoading: false });
    }
  },

  addComment: async ({
    setText,
    user,
    text,
  }: {
    setText: any;
    user: User;
    text: string;
  }) => {
    const temporalId = Date.now(); // ID temporal
    const optimisticComment: CommentType = {
      id: temporalId,
      text: text,
      date: Date(),
      replies: [],
      user_photo_url: user.photo_url,
      user_name: user.name,
      user: user.id,
    };

    set((state) => ({
      comments: [...state.comments, optimisticComment],
    }));
    setText("");

    set({ addCommentLoading: true, error: null });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          text: text,
          replies: [],
          user_photo_url: user.photo_url,
          user_name: user.name,
          user: user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData) || "Error adding comment");
      }

      const data = await response.json();
      set({ commentToScrollId: data.id });
      set((state) => ({
        comments: [...state.comments.slice(0, -1), data],
      }));
    } catch (err) {
      let mensajeError = "Unknown Error";

      if (err instanceof Error) {
        mensajeError = err.message;
      } else if (typeof err === "string") {
        mensajeError = err;
      }
      set((state) => ({
        comments: [...state.comments.slice(0, -1)],
      }));
      set({ error: mensajeError });
      setText(text);
    } finally {
      set({ addCommentLoading: false });
    }
  },

  scrollToComment: ({
    commentRef,
  }: {
    commentRef: React.RefObject<HTMLDivElement | null>;
  }) => {
    commentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  },
}));

useCommentsStore.getState().fetchComments();
