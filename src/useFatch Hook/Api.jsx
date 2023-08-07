import React from "react";
import useFatch from "./useFatch";

const Api = () => {
  const { data, error, loading } = useFatch(
    // "https://fakestoreapi.com/products"
    "https://fake-e-commerce-api.onrender.com/product"
  );
  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error, "Error");
  console.log(data, "data");
  return (
    <div>
      {data.map((data) => {
        return (
          <>
            <h1>Name : {data?.name}</h1>
            <h1>category : {data?.category}</h1>
            <br />
            {/* <h1>{data?.description}</h1> */}
          </>
        );
      })}
    </div>
  );
};

export default Api;
