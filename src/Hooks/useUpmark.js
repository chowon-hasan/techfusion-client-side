import { useQuery } from "@tanstack/react-query";

const useUpmark = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(
        "https://my-techfusion-server.onrender.com/posts"
      );
      return res.json();
    },
  });
  return { data, isLoading, refetch };
};

export default useUpmark;
