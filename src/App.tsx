import "./App.css";

import { useState, useRef, useEffect } from "react";

function App() {
  return (
    <>
      <main className="w-full flex flex-row justify-center items-center bg-(purple-200)">
        <div className="max-w-200 flex-initial w-full h-full flex flex-col bg-black">
          <Comment></Comment>
          <AddCommentSection></AddCommentSection>
        </div>
      </main>
    </>
  );
}

export default App;

const AddCommentSection = () => {
  return (
    <div className="bg-white mt-10 flex-initial h-40 rounded-md flex flex-row gap-4 p-6">
      <img src="/avatars/image-amyrobson.png" className="w-12 h-12"></img>
      <textarea
        className="w-full flex-1 border-gray-200 max-h-29 border border-solid rounded-md py-3 px-4 text-start text-md"
        placeholder="Add a comment..."
      ></textarea>
      <button className="bg-(--purple-600) border rounded-md h-10 px-6 text-white">
        SEND
      </button>
    </div>
  );
};

const Comment = () => {
  const [textExpanded, setTextExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const checkOverflow = () => {
    const el = textRef.current;
    if (el) {
      const hasOverflow = el.scrollHeight > el.clientHeight;
      setIsClamped(hasOverflow);
    }
  };

  useEffect(() => {
    checkOverflow();
  }, []);

  return (
    <div
      className={`bg-white mt-100 min-h-fit-content flex-initial max-h-100 flex flex-row gap-10 rounded-md flex flex-row gap-4 p-6 relative`}
    >
      <Votes></Votes>
      <div className="flex flex-col flex-1 w-100 gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify items-center gap-4">
            <img src="/avatars/image-amyrobson.png" className="w-10 h-10"></img>
            <span className="text-lg font-bold">Peter Grifing</span>
            <span className=" text-gray-500">1 week ago</span>
          </div>
          <ReplyButton></ReplyButton>
        </div>

        <span
          ref={textRef}
          className={`${
            !textExpanded ? "max-h-30 line-clamp-3" : "max-h-none"
          } ${isClamped ? "mb-6" : ""} text-start text-md  text-gray-500`}
        >
          lsdkflñkj kasdf kajsdflk jasdlkfj añslkdfjñl akjñsldakjfñlaksjdfñlk
          jñsladkflsdkflñkj kasdf kajsdflk jasdlkfj añslkdfjñl
          akjñsldakjfñlaksjdfñlk jñsladkfj asdñlfk jñlaslsdkflñkj kasdf kajsdflk
          jasdlkfj añslkdfjñl akjñsldakjfñlaksjdfñlk jñsladkfj asdñlfk
          jñlaslsdkflñkj kasdf kajsdflk jasdlkfj añslkdfjñl
          akjñsldakjfñlaksjdfñlk jñsladkfj asdñlfk jñlaslsdkflñkj kasdf kajsdflk
          jasdlkfj añslkdfjñl akjñsldakjfñlaksjdfñlk jñsladkfj asdñlfk jñlasj
          asdñlfk jñlas
        </span>
        {isClamped && (
          <button
            onClick={() => setTextExpanded(!textExpanded)}
            className="cursor-pointer absolute bottom-4 right-4 text-(--purple-400) flex flex-row min-w-max "
          >
            {textExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="50 30 550 550"
                className="fill-(--purple-400) min-w-6 scale-80"
              >
                <path d="M297.4 201.4C309.9 188.9 330.2 188.9 342.7 201.4L502.7 361.4C515.2 373.9 515.2 394.2 502.7 406.7C490.2 419.2 469.9 419.2 457.4 406.7L320 269.3L182.6 406.6C170.1 419.1 149.8 419.1 137.3 406.6C124.8 394.1 124.8 373.8 137.3 361.3L297.3 201.3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="50 30 550 550"
                className="fill-(--purple-400) min-w-6 scale-80"
              >
                <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
              </svg>
            )}
            <span className="text-nowrap active:underline active:underline-offset-2">
              {!textExpanded ? "Mostar más" : "Mostrar menos"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

const Votes = () => {
  return (
    <div className="h-25 w-10 bg-(--purple-100) rounded-md flex-none flex flex-col items-center justify-between">
      <button className="w-8 h-8 cursor-pointer text-(--purple-400) text-lg font-bold">
        +
      </button>
      <span className="text-lg font-bold text-(--purple-600)">4</span>
      <button className="w-8 h-8 cursor-pointer text-(--purple-400) font-bold">
        <span className="text-lg scale-x-200">-</span>
      </button>
    </div>
  );
};

const ReplyButton = () => {
  return (
    <button className="font-bold h-10 text-(--purple-600) flex flex-row items-center gap-1 cursor-pointer">
      <img src="/icon-reply.svg" className="h-4 w-4" />
      <span className="text-lg">Reply</span>
    </button>
  );
};
