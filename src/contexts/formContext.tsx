import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export const FormContext = createContext<{
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
}>({
  text: "",
  setText: () => {},
  warningMessage: "",
  setWarningMessage: () => {},
});

export function FormContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [text, setText] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  return (
    <FormContext value={{ text, setText, warningMessage, setWarningMessage }}>
      {children}
    </FormContext>
  );
}
