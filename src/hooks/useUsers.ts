import { useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  photo_url: string;
  email: string;
};

export const useUsers = function (): {
  users: Comment[];
  isLoading: boolean;
} {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async function () {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Si metemos autenticación, aquí iría el Token
          },
        });

        const data = await response.json();
        console.log(data);
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al crear:", error);
      }
    };

    getUsers();
  }, []);

  return { users, isLoading };
};
