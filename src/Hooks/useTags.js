import { useQuery } from "@tanstack/react-query";

const useTags = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await fetch("https://my-techfusion-server.onrender.com/tags");
      return res.json();
    },
  });
  return [data, isLoading, refetch];
};

export default useTags;
