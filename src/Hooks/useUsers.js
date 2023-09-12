import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const {
    isLoading,
    data: singleUsers,
    refetch,
  } = useQuery(
    {
      queryKey: ["users"],
      queryFn: async () => {
        const res = await fetch(
          "https://my-techfusion-server.onrender.com/users"
        );
        return res.json();
      },
    },
    {
      refetchInterval: 1000, // Set a suitable interval for automatic refetch (optional)
    }
  );
  // console.log(users);
  return [singleUsers, isLoading, refetch];
};

export default useUsers;
