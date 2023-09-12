import { useEffect, useState } from "react";

const useFetch2 = (path, email) => {
  const [FetchData, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        const response = fetch(
          `https://my-techfusion-server.onrender.com/${path}/${email}`
        );

        if (!response.ok) {
          setError("Network response was not ok");
        }

        const jsonData = response.json();
        setdata(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log(FetchData);

  return { FetchData, loading, error };
};

export default useFetch2;
