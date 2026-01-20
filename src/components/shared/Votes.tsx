type VotesProp = {
  orientation: "horizontal" | "vertical";
  votes: number;
};

export const Votes = ({ orientation, votes }: VotesProp) => {
  if (orientation === "horizontal") {
    return (
      <div className="h-10 w-25 bg-(--purple-100) rounded-lg flex-none flex flex-row items-center justify-between">
        <button className="w-8 h-8 cursor-pointer text-(--purple-400) text-lg font-bold">
          +
        </button>
        <span className="text-lg font-bold text-(--purple-600)">{votes}</span>
        <button className="w-8 h-8 cursor-pointer text-(--purple-400) font-bold">
          <span className="text-lg scale-x-200">-</span>
        </button>
      </div>
    );
  }

  return (
    <div className="h-25 w-10 bg-(--purple-100) rounded-lg flex-none flex flex-col items-center justify-between">
      <button className="w-8 h-8 cursor-pointer text-(--purple-400) text-lg font-bold">
        +
      </button>
      <span className="text-lg font-bold text-(--purple-600)">{votes}</span>
      <button className="w-8 h-8 cursor-pointer text-(--purple-400) font-bold">
        <span className="text-lg scale-x-200">-</span>
      </button>
    </div>
  );
};
