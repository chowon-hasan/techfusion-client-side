// import React from "react";
import "../../../../src/responsives.css";
import { CircleLoader } from "react-spinners";
import useUpmark from "../../../Hooks/useUpmark";

const AllQus = () => {
  const { data, isLoading } = useUpmark();
  return (
    <section className="min-screen qustions" style={{ width: "680px" }}>
      <div className="">
        {isLoading && (
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
      <div className="grid grid-cols-2 gap-5 allqus_cont">
        {data?.map((c, i) => (
          <div
            key={i}
            className="border border-slate-500 rounded-md p-3 qustion_body"
          >
            <h1 className="text-sm">
              <span className="text-lime-300">Q :</span> {c.title}
            </h1>
            <div className="grid grid-cols-3">
              {c.keywords &&
                c?.keywords?.map((keys, j) => (
                  <p className="text-sm px-1 me-3 my-3" key={j}>
                    <span className="text-lime-300">#</span>
                    {keys.value}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllQus;
