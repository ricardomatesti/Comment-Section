import { useCommentsStore } from "../../hooks/useCommentsStore";
import { motion } from "motion/react";

type VotesProp = {
  orientation: "horizontal" | "vertical";
  votes: number;
  replyId?: number;
  commentId: number;
};

export const Votes = ({
  orientation,
  votes,
  replyId,
  commentId,
}: VotesProp) => {
  const { changeCommentVotes, changeReplyVotes } = useCommentsStore();

  const handleUpdate = (mode: "add" | "subtract") => {
    if (replyId) {
      changeReplyVotes({
        replyId,
        commentId,
        newVotes: mode === "add" ? votes + 1 : votes - 1,
        oldVotes: votes,
      });
      return;
    }

    changeCommentVotes({
      commentId,
      newVotes: mode === "add" ? votes + 1 : votes - 1,
      oldVotes: votes,
    });
  };

  if (orientation === "horizontal") {
    return (
      <div className="h-10 w-25 bg-(--purple-100) rounded-lg flex-none flex flex-row items-center justify-between">
        <button
          className="w-8 h-8 cursor-pointer text-(--purple-400) text-lg font-bold"
          onClick={() => handleUpdate("add")}
        >
          +
        </button>
        <RollingDigit digit={votes}></RollingDigit>
        <button className="w-8 h-8 cursor-pointer text-(--purple-400) font-bold">
          <span
            className="text-lg scale-x-200"
            onClick={() => handleUpdate("subtract")}
          >
            -
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="h-25 w-10 bg-(--purple-100) rounded-lg flex-none flex flex-col items-center justify-between">
      <button
        className="w-8 h-8 cursor-pointer text-(--purple-400) text-lg font-bold"
        onClick={() => handleUpdate("add")}
      >
        +
      </button>
      <RollingDigit digit={votes}></RollingDigit>
      <button className="w-8 h-8 cursor-pointer text-(--purple-400) font-bold">
        <span
          className="text-lg scale-x-200"
          onClick={() => handleUpdate("subtract")}
        >
          -
        </span>
      </button>
    </div>
  );
};

const RollingSingleDigit = ({
  digit,
  firstNegativeNumber,
}: {
  digit: number;
  firstNegativeNumber?: boolean;
}) => {
  const numberList = firstNegativeNumber
    ? [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
    : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="h-8 overflow-hidden rounded px-0">
      <motion.div
        animate={{ y: -digit * 32 }} // 32px es la altura del div (8*4 en tailwind)
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 4,
        }}
        className="flex flex-col"
      >
        {numberList.map((n) => (
          <span
            key={n}
            className="h-8 flex items-center justify-center font-bold
            text-lg font-bold text-(--purple-600)"
          >
            {n}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const RollingDigit = ({ digit }: { digit: number }) => {
  const negativeNumber = digit < 0;

  const digits = String(Math.abs(digit)).split("");

  return (
    <div className="flex flex-row items-center justify-center gap-0">
      {false && (
        <span className="text-lg font-bold text-(--purple-600)">-</span>
      )}
      {digits.map((d, i) => (
        <RollingSingleDigit
          key={i}
          digit={Number(d)}
          firstNegativeNumber={i === 0 && negativeNumber}
        />
      ))}
    </div>
  );
};
