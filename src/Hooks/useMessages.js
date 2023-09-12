import { useQuery } from "@tanstack/react-query";

const useMessages = async () => {
  const {
    isLoading,
    data: allUsersQ,
    refetch,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await fetch(
        "https://my-techfusion-server.onrender.com/allusers"
      );
      return res.json();
    },
  });
  // console.log(users);
  return [allUsersQ, isLoading, refetch];
};

export default useMessages;
