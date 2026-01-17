export const ReplyButton = () => {
  return (
    <button className="font-bold h-10 text-(--purple-600) flex flex-row items-center gap-1 cursor-pointer">
      <img src="/icon-reply.svg" className="h-4 w-4" />
      <span className="text-lg">Reply</span>
    </button>
  );
};
