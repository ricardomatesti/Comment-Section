import { useContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "../hooks/useUsers";
import { UserContext } from "../contexts/userContext";

const users = [
  {
    id: 2,
    name: "Peter Griffin",
    photo_url:
      "https://imagedelivery.net/LBWXYQ-XnKSYxbZ-NuYGqQ/f69f1ba2-802c-4160-b24f-e54c5cffc200/avatarhd",
    email: "petergriffin@gmail.com",
  },
  {
    id: 3,
    name: "Jarfaiter",
    photo_url:
      "https://i1.sndcdn.com/artworks-000148427018-oorx39-t500x500.jpg",
    email: "jarfa@gmail.com",
  },
  {
    id: 4,
    name: "Ibai",
    photo_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/574228be-01ef-4eab-bc0e-a4f6b68bedba-profile_image-300x300.png",
    email: "ibai@gmail.com",
  },
  {
    id: 5,
    name: "Antonio Recio",
    photo_url:
      "http://pbs.twimg.com/profile_images/1407613227/recio_400x400.jpg",
    email: "ibai@gmail.com",
  },
];

export const SwitchUserModal = ({
  onClose,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleSwitch = () => {};

  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-[#00000066] z-20"
      onClick={() => {
        onClose(false);
      }}
    >
      <div
        className="flex flex-col bg-white rounded-xl p-8 w-120 gap-6"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="font-semibold text-3xl text-(--purple-600)">
          Choose User
        </span>
        <div className="flex flex-row gap-2 flex-wrap">
          {users.map((user) => {
            return (
              <UserButton
                key={user.id}
                user={user}
                onclose={onClose}
              ></UserButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const UserButton = ({
  user,
  onclose,
}: {
  user: User;
  onclose: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setUser } = useContext(UserContext);

  return (
    <button
      className="flex flex-1 basis-auto flex-row gap-2 items-center px-4 py-2 rounded-xl border-2 border-transparent bg-(--purple-600) hover: cursor-pointer transition-all group active:opacity-70"
      onClick={() => {
        setUser(user);
        onclose(false);
      }}
    >
      <img
        src={user.photo_url}
        className="w-12 h-12 rounded-full border-0 border-white shadow-sm group-hover:scale-105 transition-transform"
      />
      <span className="font-bold text-white text-xl group-hover:">
        {user.name}
      </span>
    </button>
  );
};
