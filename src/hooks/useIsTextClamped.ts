import { useState, useEffect, useRef } from "react";

export const useIsTextClamped = () => {
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
  }, []);

  return {
    isClamped,
    textRef,
  };
};
