import "./App.css";

import { CommentSection } from "./components/CommentSection.js";
import { AddCommentSection } from "./components/AddCommentSection.js";

function App() {
  return (
    <>
      <main className="w-full flex flex-row justify-center items-center">
        <div className="max-w-200 flex-initial w-full h-[100vh] flex flex-col justify-between gap-4 mx-4">
          <CommentSection></CommentSection>

          <AddCommentSection></AddCommentSection>
        </div>
      </main>
    </>
  );
}

export default App;
