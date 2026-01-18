import { useState, useEffect, useRef } from "react";

export const useIsTextClamped = (text: string) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  const checkOverflow = () => {
    const el = textRef.current;
    if (el) {
      const hasOverflow = el.scrollHeight > el.clientHeight;
      setIsClamped(hasOverflow);
    }
  };

  useEffect(() => {
    checkOverflow();
  }, [text]);

  return {
    isClamped,
    textRef,
  };
};
