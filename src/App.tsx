import "./App.css";
import { CommentSection } from "./components/CommentSection.js";
import { AddCommentSection } from "./components/AddCommentSection.js";
import { Header } from "./components/Header.js";
import { UserProvider } from "./contexts/userContext.js";
import { FormContextProvider } from "./contexts/formContext.js";

function App() {
  return (
    <UserProvider>
      <main className="w-full flex flex-row justify-center items-center">
        <div
          id="app-wraper"
          className="max-w-200 flex-initial w-full h-[100dvh] flex flex-col justify-between gap-0 mx-4 overflow-hidden relative"
        >
          <Header></Header>

          <CommentSection></CommentSection>

          <FormContextProvider>
            <AddCommentSection></AddCommentSection>
          </FormContextProvider>
        </div>
      </main>
    </UserProvider>
  );
}

export default App;
