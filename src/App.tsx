import "./App.css";

import { CommentSection } from "./components/CommentSection.js";
import { AddCommentSection } from "./components/AddCommentSection.js";
import { useUser } from "./hooks/useUser.js";
import { useComments } from "./hooks/useComments";
import { useRef } from "react";

function App() {
  const userSignedUp = useUser();
  const { comments, isLoading, setComments } = useComments();
  const lastCommentRef = useRef<HTMLDivElement>(null);

  const scrollToLastComment = () => {
    lastCommentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <main className="w-full flex flex-row justify-center items-center">
        <div className="max-w-200 flex-initial w-full h-[100vh] flex flex-col justify-between gap-0 mx-4 overflow-hidden">
          <CommentSection
            userSignedUp={userSignedUp}
            comments={comments}
            lastCommentRef={lastCommentRef}
          ></CommentSection>

          <AddCommentSection
            user={userSignedUp}
            setComments={setComments}
            scrollToLastComment={scrollToLastComment}
          ></AddCommentSection>
        </div>
      </main>
    </>
  );
}

export default App;
