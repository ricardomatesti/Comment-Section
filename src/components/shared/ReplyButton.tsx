type Props = {
  replying: boolean;
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReplyButton = ({ replying, setReplying }: Props) => {
  return (
    <button
      className="font-bold h-10 text-(--purple-600) flex flex-row items-center gap-1 cursor-pointer active:opacity-50"
      onClick={() => {
        setReplying(!replying);
      }}
    >
      <img src="/icon-reply.svg" className="h-4 w-4" />
      <span className="text-lg">Reply</span>
    </button>
  );
};
