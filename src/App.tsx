import "./App.css";

import { CommentSection } from "./components/CommentSection.js";
import { AddCommentSection } from "./components/AddCommentSection.js";
import { useUser } from "./hooks/useUser.js";

function App() {
  const userSignedUp = useUser();

  return (
    <>
      <main className="w-full flex flex-row justify-center items-center">
        <div className="max-w-200 flex-initial w-full h-[100vh] flex flex-col justify-between gap-0 mx-4 overflow-hidden">
          <CommentSection userSignedUp={userSignedUp}></CommentSection>

          <AddCommentSection user={userSignedUp}></AddCommentSection>
        </div>
      </main>
    </>
  );
}

export default App;
