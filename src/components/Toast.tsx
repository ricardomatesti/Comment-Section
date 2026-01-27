import { motion } from "motion/react";
import { useCommentsStore } from "../hooks/useCommentsStore";
import { useContext, useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { FormContext } from "../contexts/formContext";

type Props = {
  type: "error" | "info" | "warning";
  text: string;
  duration?: number;
};

export const Toast = ({ type, text, duration = 2500 }: Props) => {
  const { setError } = useCommentsStore();
  const { isMobile } = useIsMobile();
  const { setWarningMessage } = useContext(FormContext);

  const MOTION_DIV_CLASSNAME = `min-w-70 w-fit max-w-100 h-min bg-white rounded-lg shadow-t-lg flex overflow-hidden ${
    isMobile ? "bottom-52" : "bottom-46"
  } absolute z-20 left-0`;

  const handleClose = () => {
    if (type === "error") {
      setError({ error: "" });
    }

    if (type === "warning") {
      setWarningMessage("");
    }
  };

  useEffect(() => {
    setTimeout(() => handleClose(), duration);
  }, []);

  if (type === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={MOTION_DIV_CLASSNAME}
      >
        <div className="w-2 bg-red-500 shrink-0" />

        <div className="flex-1 flex items-center gap-4 p-3">
          <img src="/error.png" className="h-8 w-8 shrink-0" alt="warning" />
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-gray-800">Error</span>
            <span className="text-gray-500 leading-tight">{text}</span>
          </div>
        </div>

        <div className="pr-2 pt-1">
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-xl leading-none"
            onClick={() => handleClose()}
          >
            &times;
          </button>
        </div>
      </motion.div>
    );
  }

  if (type === "info") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={MOTION_DIV_CLASSNAME}
      >
        <div className="w-2 bg-blue-400 shrink-0" />

        <div className="flex-1 flex items-center gap-4 p-3">
          <img
            src="/information.png"
            className="h-8 w-8 shrink-0"
            alt="warning"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-gray-800">Info</span>
            <span className="text-gray-500 leading-tight">{text}</span>
          </div>
        </div>

        <div className="pr-2 pt-1">
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-xl leading-none"
            onClick={() => handleClose()}
          >
            &times;
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={MOTION_DIV_CLASSNAME}
    >
      <div className="w-2 bg-yellow-400 shrink-0" />

      <div className="flex-1 flex items-center gap-4 px-3 py-1">
        <img src="/warning.png" className="h-8 w-8 shrink-0" alt="warning" />
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-gray-800">Warning</span>
          <span className="text-gray-500 leading-tight">{text}</span>
        </div>
      </div>

      <div className="pr-2 pt-1">
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-xl leading-none"
          onClick={() => handleClose()}
        >
          &times;
        </button>
      </div>
    </motion.div>
  );
};
