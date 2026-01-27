import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { SwitchUserModal } from "./Modals/SwitchUserModal";
import { UserContext } from "../contexts/userContext";
import { Image } from "./shared/Image";
import useIsMobile from "../hooks/useIsMobile";

export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { isMobile } = useIsMobile();
  const { user } = useContext(UserContext);

  if (isMobile) {
    return (
      <div className="absolute pt-4 pb-10 top-0 left-0 z-4 bg-gradient-to-b from-[var(--purple-start)] via-[var(--purple-start)] via-60% to-transparent w-full flex flex-row justify-between items-center">
        <span className="text-2xl font-bold text-(--purple-600) ">
          JUST COMMENT!
        </span>
        <div className="flex flex-row justify items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <button
              className="bg-(--purple-600) rounded-md min-h-8 px-4 text-white cursor-pointer active:opacity-50 text-md font-medium"
              onClick={() => setShowModal(true)}
            >
              SWITCH
            </button>
          </div>
          <Image src={user.photo_url}></Image>
        </div>

        {showModal &&
          createPortal(
            <SwitchUserModal onClose={setShowModal} />,
            document.getElementById("root") ?? document.body
          )}
      </div>
    );
  }
  return (
    <div className="absolute pt-4 pb-10 top-0 left-0 z-4 bg-gradient-to-b from-[var(--purple-start)] via-[var(--purple-start)] via-60% to-transparent w-full flex flex-row justify-between">
      <span className="text-3xl font-bold text-(--purple-600) ">
        JUST COMMENT!
      </span>
      <div className="flex flex-row justify items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <button
            className="bg-(--purple-600) rounded-md min-h-8 px-4 text-white cursor-pointer active:opacity-50 text-lg font-medium"
            onClick={() => setShowModal(true)}
          >
            SWITCH
          </button>
        </div>
        <Image src={user.photo_url}></Image>
      </div>

      {showModal &&
        createPortal(
          <SwitchUserModal onClose={setShowModal} />,
          document.getElementById("root") ?? document.body
        )}
    </div>
  );
};
