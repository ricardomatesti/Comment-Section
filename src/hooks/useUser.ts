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
        "https://i1.sndcdn.com/artworks-000148427018-oorx39-t500x500.jpg",
      email: "jarfa@gmail.com",
    },
  ];
  return users[1];
};
