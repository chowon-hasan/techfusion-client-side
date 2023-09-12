import { useQuery } from "@tanstack/react-query";

const useInbox = (path, email) => {
  return useQuery(["usermessages", path, email], async () => {
    const response = await fetch(
      `https://my-techfusion-server.onrender.com/${path}/${email}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  });
};

export default useInbox;
