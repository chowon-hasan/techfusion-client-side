import { useQuery } from "@tanstack/react-query";

const useBookmark = (path, email) => {
  return useQuery(["bookedmark", path, email], async () => {
    const response = await fetch(
      `https://my-techfusion-server.onrender.com/${path}/${email}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Return null for data if 404 error
      } else {
        throw new Error("Network response was not ok");
      }
    }

    return response.json();
  });
};

export default useBookmark;
