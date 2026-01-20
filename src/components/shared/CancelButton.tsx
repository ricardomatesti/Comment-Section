type Props = { onClick: () => void };

export const CancelButton = ({ onClick }: Props) => {
  return (
    <button
      className="bg-transparent border rounded-md h-10 px-0 cursor-pointer active:opacity-50 font-medium text-red-500 border-none underline underline-offset-2"
      onClick={onClick}
    >
      CANCEL
    </button>
  );
};
