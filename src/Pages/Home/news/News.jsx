// import React from 'react';
import { FaJira } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

const News = () => {
  const [newsData, setNewsdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newsURL = "/news.json";

    fetch(newsURL)
      .then((res) => res.json())
      .then((newsdata) => {
        setNewsdata(newsdata);
        setLoading(false);
        console.log(newsdata);
      });
  }, []);

  const handleNews = () => {
    toast("This feature will active soon");
  };
  return (
    <section className="w-full">
      <div className="">
        {loading && (
          <div
            className="
            h-[70vh]
            flex 
            flex-col 
            justify-center 
            items-center"
          >
            <CircleLoader size={100} color="#36d7b7" />
          </div>
        )}
      </div>
      <div
        className="mt-5 p-1"
        style={{
          width: "100%",
        }}
      >
        {" "}
        <span className="flex items-center ms-3 mb-5">
          <FaJira className="me-2 text-lime-300" /> Todays top trends news
        </span>
        <div
          // style={{ height: "80vh", overflowY: "scroll" }}
          className="rightnavParent"
        >
          {newsData?.map(
            (c, i) =>
              c?.urlToImage && (
                <div key={i} className="">
                  <ul className="left_nav">
                    <li>
                      <div className="px-1 text-sm">
                        {c?.urlToImage ? (
                          <img className="mb-2" src={c?.urlToImage} alt="" />
                        ) : (
                          "no image"
                        )}

                        <h1 className="font-bold">{c?.title}</h1>
                        <p className="text-xs text-lime-300 my-2">
                          Author : {c?.author}
                        </p>
                        <button
                          onClick={handleNews}
                          className="btn btn-xs bg-slate-700 text-white capitalize"
                        >
                          see full news
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              )
          )}
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default News;
