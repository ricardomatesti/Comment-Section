export const useUser = () => {
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
        "https://cdn.aragonmusical.com/wp-content/uploads/2022/01/Jarfaiter.jpg",
      email: "jarfa@gmail.com",
    },
  ];
  return users[1];
};
