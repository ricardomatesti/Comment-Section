type Props = {};

export const EditButton = ({}: Props) => {
  return (
    <button
      className="font-bold h-10 text-(--purple-600) flex flex-row items-center gap-1 cursor-pointer active:opacity-50"
      onClick={() => {}}
    >
      <img src="/icon-edit.svg" className="h-4 w-4" />
      <span className="text-lg">Edit</span>
    </button>
  );
};
