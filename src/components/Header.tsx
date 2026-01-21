import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { SwitchUserModal } from "./SwitchUserModal";
import { UserContext } from "../contexts/userContext";

const root = document.getElementById("root");

export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="absolute pt-4 pb-10 top-0 left-0 z-4 bg-gradient-to-b from-[var(--purple-start)] via-[var(--purple-start)] via-60% to-transparent w-full flex flex-row justify-between">
      <span className="text-3xl font-bold text-(--purple-600) ">
        JUST COMMENT!
      </span>
      <div className="flex flex-row justify items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <button
            className="bg-(--purple-600) border rounded-md min-h-8 px-4 text-white cursor-pointer active:opacity-50 text-lg font-medium"
            onClick={() => setShowModal(true)}
          >
            SWITCH
          </button>

          {false && (
            <button className="bg-(--purple-600) border rounded-md h-8 px-4 text-white cursor-pointer active:opacity-50 font-medium">
              SEND
            </button>
          )}
        </div>
        <img src={user.photo_url} className="w-10 h-10 rounded-[50%]"></img>
      </div>

      {showModal &&
        createPortal(
          <SwitchUserModal onClose={setShowModal} />,
          root ?? document.body
        )}
    </div>
  );
};
