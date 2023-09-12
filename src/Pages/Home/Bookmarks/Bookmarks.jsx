// import React from "react";
import "../../../../src/responsives.css";
import { useContext } from "react";
import { AuthContext } from "../../../Authprovider/Auth";
import { CircleLoader } from "react-spinners";
// import useFetch2 from "../../../Hooks/useFetch2";s
import useBookmark from "../../../Hooks/useBookmark";

const Bookmarks = () => {
  const { users } = useContext(AuthContext);
  const { data: FetchData, isLoading } = useBookmark(
    "bookmarked",
    users?.email
  );
  console.log(FetchData);
  return (
    <section className="bookmark" style={{ width: "680px" }}>
      <div>
        <h1 className="mb-5 text-center capitalize">your bookmark lists</h1>
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
        {FetchData?.map((c, i) => (
          <>
            <div key={i} className="border flex p-3 mb-3 book_cont">
              <div className="w-1/2 book_img">
                {c.image && (
                  <img
                    style={{ width: "200px", height: "100px" }}
                    src={c.image}
                  />
                )}
                <div className="text-xs mt-1">
                  {c.postTime &&
                    new Date(c.postTime).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      timeZone: "Asia/Dhaka",
                    })}
                </div>
              </div>
              <div className="ms-3">
                <h1>{c.title}</h1>
                <p className="text-sm">
                  {c.description.slice(0, 200)}...{" "}
                  <span className="text-lime-300">see post</span>
                </p>
                <div className="flex">
                  {c.keywords &&
                    c.keywords.map((keys, j) => (
                      <p className="text-sm px-1 me-3 my-3" key={j}>
                        <span className="text-lime-300">#</span>
                        {keys.value}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default Bookmarks;
