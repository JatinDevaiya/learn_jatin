import axios from "axios";
import  { useEffect, useState } from "react";

const useFatch = (url) => {
  const [data, setdData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setdData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFatch;
