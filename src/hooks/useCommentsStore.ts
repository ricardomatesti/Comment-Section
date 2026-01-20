import { type User } from "./useUsers";
import { create } from "zustand";

export type CommentType = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  user_photo_url: string;
  votes: number;
  replies: Reply[];
};

export type Reply = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  user_photo_url: string;
  comment: number;
  votes: number;
};

interface CommentsState {
  comments: CommentType[];
  commentsLoading: boolean;
  addCommentLoading: boolean;
  addReplyLoading: boolean;
  error: string | null;
  commentToScrollId: number | undefined;

  // Acciones
  fetchComments: () => Promise<void>;
  addComment: (params: {
    setText: (t: string) => void;
    user: User;
    text: string;
  }) => Promise<void>;
  addReply: ({
    setText,
    user,
    text,
    commentId,
    setReplying,
  }: {
    setText: any; //TODO tipar
    user: User;
    text: string;
    commentId: number;
    setReplying: React.Dispatch<React.SetStateAction<boolean>>;
  }) => Promise<void>;
  deleteComment: ({ commentId }: { commentId: number }) => void;
  deleteReply: ({
    parentCommentId,
    replyId,
  }: {
    parentCommentId: number;
    replyId: number;
  }) => void;
  updateComment: ({
    commentId,
    text,
    oldText,
    setText,
  }: {
    commentId: number;
    text: string;
    oldText: string;
    setText: any;
  }) => void;
  updateReply: ({
    commentId,
    replyId,
    text,
    oldText,
    setText,
  }: {
    commentId: number;
    replyId: number;
    text: string;
    oldText: string;
    setText: any;
  }) => void;
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
  addReplyLoading: false,
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
      votes: 0,
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

  addReply: async ({
    setText,
    user,
    text,
    commentId,
    setReplying,
  }: {
    setText: any;
    user: User;
    text: string;
    commentId: number;
    setReplying: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const temporalId = Date.now(); // ID temporal
    const optimisticReply: Reply = {
      id: temporalId,
      text: text,
      date: Date(),
      user_photo_url: user.photo_url,
      user_name: user.name,
      user: user.id,
      votes: 0,
      comment: commentId,
    };

    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...c.replies, optimisticReply] }
          : c
      ),
    }));
    setText("");
    setReplying(false);

    set({ addReplyLoading: true, error: null });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reply/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          text: text,
          user_photo_url: user.photo_url,
          user_name: user.name,
          user: user.id,
          comment: commentId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData) || "Error adding reply");
      }

      const data = await response.json();
      set({ commentToScrollId: commentId });
      set((state) => ({
        comments: state.comments.map((c) =>
          c.id === commentId
            ? { ...c, replies: [...c.replies.slice(0, -1), data] }
            : c
        ),
      }));
    } catch (err) {
      let mensajeError = "Unknown Error";

      if (err instanceof Error) {
        mensajeError = err.message;
      } else if (typeof err === "string") {
        mensajeError = err;
      }

      set((state) => ({
        comments: state.comments.map((c) =>
          c.id === commentId
            ? { ...c, replies: [...c.replies.slice(0, -1)] }
            : c
        ),
        error: mensajeError,
      }));
      setText(text);
      setReplying(true);
    } finally {
      set({ addReplyLoading: false });
    }
  },

  deleteComment: async ({ commentId }: { commentId: number }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/comment/${commentId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData) || "Error adding comment");
      }

      set((state) => ({
        comments: [...state.comments.slice(0, -1)],
      }));
    } catch (err) {
      let mensajeError = "Unknown Error";

      if (err instanceof Error) {
        mensajeError = err.message;
      } else if (typeof err === "string") {
        mensajeError = err;
      }

      set({ error: mensajeError });
    }
  },

  deleteReply: async ({
    parentCommentId,
    replyId,
  }: {
    parentCommentId: number;
    replyId: number;
  }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/reply/${replyId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData) || "Error adding comment");
      }

      set((state) => ({
        comments: [
          ...state.comments.map((c) =>
            c.id === parentCommentId
              ? {
                  ...c,
                  replies: [...c.replies.filter((r) => r.id !== replyId)],
                }
              : c
          ),
        ],
      }));
    } catch (err) {
      let mensajeError = "Unknown Error";

      if (err instanceof Error) {
        mensajeError = err.message;
      } else if (typeof err === "string") {
        mensajeError = err;
      }

      set({ error: mensajeError });
    }
  },

  updateComment: async ({
    commentId,
    text,
    oldText,
    setText,
  }: {
    commentId: number;
    text: string;
    oldText: string;
    setText: any;
  }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/comment/${commentId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ text: text }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData) || "Error adding comment");
      }
      setText(text);
      set((state) => ({
        comments: [
          ...state.comments.map((c) =>
            c.id === commentId ? { ...c, text: text } : c
          ),
        ],
      }));
    } catch (err) {
      let mensajeError = "Unknown Error";

      if (err instanceof Error) {
        mensajeError = err.message;
      } else if (typeof err === "string") {
        mensajeError = err;
      }
      setText(oldText);
      set({ error: mensajeError });
    }
  },
  updateReply: async ({
    commentId,
    replyId,
    text,
    oldText,
    setText,
  }: {
    commentId: number;
    replyId: number;
    text: string;
    oldText: string;
    setText: any;
  }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/reply/${replyId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ text: text }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData) || "Error adding comment");
      }
      setText(text);
      set((state) => ({
        comments: [
          ...state.comments.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  replies: [
                    ...c.replies.map((r) =>
                      r.id === replyId ? { ...r, text: text } : r
                    ),
                  ],
                }
              : c
          ),
        ],
      }));
    } catch (err) {
      let mensajeError = "Unknown Error";

      if (err instanceof Error) {
        mensajeError = err.message;
      } else if (typeof err === "string") {
        mensajeError = err;
      }
      setText(oldText);
      set({ error: mensajeError });
    }
  },
}));

useCommentsStore.getState().fetchComments();
