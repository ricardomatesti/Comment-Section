import { useState, useEffect, useRef } from "react";
import type { CommentType } from "./useComments";

export const useIsOverflowed = (comments: CommentType[]) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  const checkOverflow = () => {
    const el = divRef.current;

    if (el) {
      const hasOverflow = el.scrollHeight > el.clientHeight;
      setIsOverflowed(hasOverflow);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [comments]);

  return {
    isOverflowed,
    divRef,
  };
};
