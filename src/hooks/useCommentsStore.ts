import { type User } from "./useUsers";
import { create } from "zustand";
import type { Dispatch, SetStateAction } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export type CommentType = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  user_photo_url: string;
  votes: number;
  replies: ReplyType[];
  optimistic_comment?: boolean;
};

export type ReplyType = {
  date: string;
  id: number;
  text: string;
  user: number;
  user_name: string;
  user_photo_url: string;
  comment: number;
  votes: number;
  optimistic_comment?: boolean;
};

interface CommentsState {
  comments: CommentType[];
  commentsLoading: boolean;
  addCommentLoading: boolean;
  addReplyLoading: boolean;
  error: string | null;
  commentToScrollId: number | undefined;

  // Acciones
  setError: ({ error }: { error: string }) => void;
  fetchComments: () => Promise<void>;
  addComment: (params: {
    setText: Dispatch<SetStateAction<string>>;
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
    setText: Dispatch<SetStateAction<string>>;
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
    setText: Dispatch<SetStateAction<string>>;
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
    setText: Dispatch<SetStateAction<string>>;
  }) => void;
  changeCommentVotes: ({
    commentId,
    oldVotes,
    newVotes,
  }: {
    commentId: number;
    oldVotes: number;
    newVotes: number;
  }) => void;
  changeReplyVotes: ({
    replyId,
    commentId,
    oldVotes,
    newVotes,
  }: {
    commentId: number;
    replyId: number;
    oldVotes: number;
    newVotes: number;
  }) => void;
  scrollToComment: ({
    commentRef,
  }: {
    commentRef: React.RefObject<HTMLDivElement | null>;
  }) => void;
}

export const useCommentsStore = create<CommentsState>((set) => ({
  comments: [],
  commentsLoading: false,
  addCommentLoading: false,
  addReplyLoading: false,
  error: null,
  commentToScrollId: undefined,
  setError: ({ error }: { error: string }) => {
    set({ error: error });
  },

  fetchComments: async () => {
    set({ commentsLoading: true });

    try {
      const response = await fetch(`${API_URL}/api/comment/`, {
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
    setText: Dispatch<SetStateAction<string>>;
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
      optimistic_comment: true,
    };

    set((state) => ({
      comments: [...state.comments, optimisticComment],
    }));
    setText("");

    set({ addCommentLoading: true, error: null });

    try {
      const response = await fetch(`${API_URL}/api/comment/`, {
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
          votes: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Unexpected error adding comment");
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
    set({ commentToScrollId: undefined });
  },

  addReply: async ({
    setText,
    user,
    text,
    commentId,
    setReplying,
  }: {
    setText: Dispatch<SetStateAction<string>>;
    user: User;
    text: string;
    commentId: number;
    setReplying: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const temporalId = Date.now(); // ID temporal
    const optimisticReply: ReplyType = {
      id: temporalId,
      text: text,
      date: Date(),
      user_photo_url: user.photo_url,
      user_name: user.name,
      user: user.id,
      votes: 0,
      comment: commentId,
      optimistic_comment: true,
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
      const response = await fetch(`${API_URL}/api/reply/`, {
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
          votes: 0,
        }),
      });

      if (!response.ok) {
        //const errorData = await response.json();
        //Normally we would throw JSON.stringify(errorData) ||"Error adding reply"
        throw new Error("Unexpected error adding reply");
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
      const response = await fetch(`${API_URL}/api/comment/${commentId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Unexpected error deleting comment");
      }

      set((state) => ({
        comments: [...state.comments.filter((c) => c.id !== commentId)],
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
      const response = await fetch(`${API_URL}/api/reply/${replyId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Unexpected error deleting reply");
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
    setText: Dispatch<SetStateAction<string>>;
  }) => {
    try {
      const response = await fetch(`${API_URL}/api/comment/${commentId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        throw new Error("Unexpected error updating comment");
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
    setText: Dispatch<SetStateAction<string>>;
  }) => {
    try {
      const response = await fetch(`${API_URL}/api/reply/${replyId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        throw new Error("Unexpected error updating reply");
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
  changeCommentVotes: async ({
    commentId,
    newVotes,
  }: {
    commentId: number;
    newVotes: number;
  }) => {
    try {
      const response = await fetch(`${API_URL}/api/comment/${commentId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ votes: newVotes }),
      });

      if (!response.ok) {
        throw new Error("Unexpected error updating votes");
      }

      set((state) => ({
        comments: [
          ...state.comments.map((c) =>
            c.id === commentId ? { ...c, votes: newVotes } : c
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
  changeReplyVotes: async ({
    replyId,
    commentId,
    newVotes,
  }: {
    commentId: number;
    replyId: number;
    newVotes: number;
  }) => {
    try {
      const response = await fetch(`${API_URL}/api/reply/${replyId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Aquí añadir el token si hubiera login: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ votes: newVotes }),
      });

      if (!response.ok) {
        throw new Error("Unexpected error updating votes");
      }

      set((state) => ({
        comments: [
          ...state.comments.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  replies: [
                    ...c.replies.map((r) =>
                      r.id === replyId ? { ...r, votes: newVotes } : r
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

      set({ error: mensajeError });
    }
  },
}));

useCommentsStore.getState().fetchComments();
