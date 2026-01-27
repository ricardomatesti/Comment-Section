import { createContext, useState } from "react";
import type { User } from "../hooks/useUsers";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export const UserContext = createContext<{
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}>({
  user: {
    id: 1,
    name: "Peter Griffin",
    photo_url:
      "https://imagedelivery.net/LBWXYQ-XnKSYxbZ-NuYGqQ/f69f1ba2-802c-4160-b24f-e54c5cffc200/avatarhd",
    email: "petergriffin@gmail.com",
  },
  setUser: () => {},
});

export function UserProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [user, setUser] = useState({
    id: 1,
    name: "Peter Griffin",
    photo_url:
      "https://imagedelivery.net/LBWXYQ-XnKSYxbZ-NuYGqQ/f69f1ba2-802c-4160-b24f-e54c5cffc200/avatarhd",
    email: "petergriffin@gmail.com",
  });

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
}
