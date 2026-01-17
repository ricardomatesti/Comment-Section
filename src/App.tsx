import "./App.css";

import { Comment } from "./components/Comment.js";
import { AddCommentSection } from "./components/AddCommentSection.js";

function App() {
  return (
    <>
      <main className="w-full flex flex-row justify-center items-center">
        <div className="max-w-200 flex-initial w-full h-full flex flex-col gap-4">
          <Comment
            text={
              "This is my first comment! This is my first comment! This is my first comment!v This is my first comment! This is my first comment! v v vThis is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!This is my first comment!"
            }
            imgUrl={"/avatars/image-amyrobson.png"}
            date={"12-02-2025"}
            userName={"Peter Griffing"}
          ></Comment>

          <AddCommentSection></AddCommentSection>
        </div>
      </main>
    </>
  );
}

export default App;
