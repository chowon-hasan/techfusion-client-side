import { useEffect, useState } from "react";

const useFetchAllData = () => {
  const [FetchDataAllData, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://my-techfusion-server.onrender.com/posts`
        );

        if (!response.ok) {
          setError("Network response was not ok");
        }

        const jsonData = await response.json();
        setdata(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { FetchDataAllData, loading, error };
};

export default useFetchAllData;
