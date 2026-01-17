type Props = {};

export const DeleteButton = ({}: Props) => {
  return (
    <button
      className="font-bold h-10 text-(--purple-600) flex flex-row items-center gap-1 cursor-pointer active:opacity-50"
      onClick={() => {}}
    >
      <img src="/icon-delete.svg" className="h-4 w-4" />
      <span className="text-lg text-red-400 font-medium">Delete</span>
    </button>
  );
};
