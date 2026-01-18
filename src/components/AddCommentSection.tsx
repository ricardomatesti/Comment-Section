import { useIsMobile } from "../hooks/useIsMobile";

export const AddCommentSection = () => {
  const { isMobile } = useIsMobile();

  if (isMobile) {
    return (
      <div className="bg-white mt-10 flex-initial h-50 rounded-md flex flex-col gap-4 p-4 mb-4">
        <textarea
          className="w-full flex-1 border-gray-200 max-h-40 border border-solid rounded-md py-3 px-4 text-start text-md"
          placeholder="Add a comment..."
        ></textarea>
        <div className="flex flex-row justify-between">
          <img src="/avatars/image-amyrobson.png" className="w-10 h-10"></img>

          <button className="bg-(--purple-600) border rounded-md h-12 px-6 text-white cursor-pointer active:opacity-50">
            SEND
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white mt-10 flex-initial h-40 rounded-md flex flex-row gap-4 p-6 mb-4">
      <img src="/avatars/image-amyrobson.png" className="w-12 h-12"></img>
      <textarea
        className="w-full flex-1 border-gray-200 max-h-29 border border-solid rounded-md py-3 px-4 text-start text-md"
        placeholder="Add a comment..."
      ></textarea>
      <button className="bg-(--purple-600) border rounded-md h-10 px-6 text-white cursor-pointer active:opacity-50">
        SEND
      </button>
    </div>
  );
};
