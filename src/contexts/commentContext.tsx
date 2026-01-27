import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export const CommentContext = createContext<{
  textExpanded: boolean;
  setTextExpanded: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  replying: boolean;
  setReplying: Dispatch<SetStateAction<boolean>>;
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  textEditing: string;
  setTextEditing: Dispatch<SetStateAction<string>>;
}>({
  textExpanded: false,
  setTextExpanded: () => {},
  showModal: false,
  setShowModal: () => {},
  replying: false,
  setReplying: () => {},
  editing: false,
  setEditing: () => {},
  textEditing: "",
  setTextEditing: () => {},
});

export function CommentContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [textExpanded, setTextExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [textEditing, setTextEditing] = useState("");

  return (
    <CommentContext
      value={{
        textExpanded,
        setTextExpanded,
        showModal,
        setShowModal,
        replying,
        setReplying,
        editing,
        setEditing,
        textEditing,
        setTextEditing,
      }}
    >
      {children}
    </CommentContext>
  );
}
