// import React from "react";
import "../../../../src/responsives.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const produscts = "/data.json";

const Market = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const handleAllProducts = () => {
    fetch(produscts)
      .then((res) => res.json())
      .then((resdata) => {
        setAllProducts(resdata);
        setDisabled(true);
      });
  };
  const handleSingleProd = () => {
    toast("This feature will active soon");
  };
  useEffect(() => {
    fetch(produscts)
      .then((res) => res.json())
      .then((resdata) => {
        setAllProducts(resdata.slice(0, 6));
        console.log(resdata);
      });
  }, []);
  return (
    <section className="market" style={{ width: "680px" }}>
      <div className="">
        <div className="grid grid-cols-2 gap-5 market_cont">
          {allProducts?.map((product, i) => (
            <div
              key={i}
              className="border border-slate-600 rounded-md market_body"
            >
              <img
                style={{
                  width: "100%",
                  height: "200px",
                  margin: "0 0 15px 0",
                  borderRadius: "5px",
                }}
                src={product.images[0]}
                alt="Shoes"
              />
              <div className="p-3 rounded-md">
                <h2 className="">name : {product.title}</h2>
                <p className="text-sm">{product.description.slice(0, 35)}</p>
                <p className="text-sm">Brand : {product.brand}</p>
                <div className="flex justify-between">
                  <p className="text-sm">rating : {product.rating}</p>
                  <p className="text-sm">Price : ${product.price}</p>
                  <p className="text-sm">Stock : {product.stock}</p>
                </div>
              </div>

              <div className="text-center mb-5">
                <button
                  onClick={handleSingleProd}
                  className="btn border border-lime-300 bg-transparent text-white capitalize"
                >
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center my-5">
          <button
            onClick={handleAllProducts}
            disabled={disabled}
            className="btn btn-wide"
          >
            show All
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Market;
