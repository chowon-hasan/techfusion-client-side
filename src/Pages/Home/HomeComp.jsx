import "../../../src/responsives.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Authprovider/Auth";
import { CircleLoader } from "react-spinners";
import "./homeComp.css";
import useUpmark from "../../Hooks/useUpmark";
import {
  BiDownArrow,
  BiSolidDownArrow,
  BiSolidUpArrow,
  BiUpArrow,
} from "react-icons/bi";
import { FaBookmark, FaDashcube } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import useFetch2 from "../../Hooks/useFetch2";

//
const HomeComp = () => {
  const textareaRef = useRef();
  const { data, isloading, refetch } = useUpmark();
  const { users } = useContext(AuthContext);
  const [inputShow, setInputShow] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [disabled, setDisabled] = useState({});
  const [bookedmarkDis, setBookmarkedDis] = useState({});

  const { data: FetchData } = useFetch2(
    "userinfoemail",
    users?.email,
    "userinfoemail"
  );
  const [infos] = FetchData || [];
  const { image } = infos || [];

  const { data: bmData } = useFetch2("bookmarked", users?.email, "bookmarked");

  // HANDLE COMMENTS FUNCTION TO DB
  const handleSubmit = (event, id) => {
    const timeStamp = new Date();
    event.preventDefault();

    const commentValue = event.target.comment.value;
    const postId = id;

    const comments = {
      commentValue,
      commentUser: users?.email,
      postId: postId,
      timeStamp,
      userImg: image ? image : "https://i.ibb.co/fvJSJ4P/User-Circle.png",
    };
    fetch("https://my-techfusion-server.onrender.com/addcomments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(comments),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        const textarea = document.getElementById("commentTextarea");
        if (textarea) {
          textarea.value = "";
        }
        textareaRef.current.value = "";
      });
  };

  // HANDLE COMMENTS TOGGLE BY STATE
  const handleComment = () => {
    setInputShow(!inputShow);
  };

  // HANDLE UPMARK FUNCTION
  const handleUpmark = (id) => {
    fetch(`https://my-techfusion-server.onrender.com/upmark/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        refetch();
        setDisabled((pb) => ({
          ...pb,
          [id]: true,
        }));
      });
  };

  // HANDLE DOWNMARK FUNCTION
  const handleDownmark = (id) => {
    const usersInfo = {
      userEmail: users?.email,
      postId: id,
    };
    fetch(`https://my-techfusion-server.onrender.com/downmark/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        fetch("https://my-techfusion-server.onrender.com/userhistory", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(usersInfo),
        })
          .then((res) => res.json())
          .then(() => {
            fetch(
              `https://my-techfusion-server.onrender.com/userhistinfo/${users?.email}`
            )
              .then((res) => res.json())
              .then((data) => {
                setDisabled((pb) => ({
                  ...pb,
                  [id]: true,
                }));
                setUserHistory(data);
              });
          });
        refetch();
      });
  };

  // handle bookmark to DB
  const handleBookmark = (id) => {
    const bookmarkInfo = {
      user: users?.email,
      postId: id,
    };
    fetch("https://my-techfusion-server.onrender.com/bookmark", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookmarkInfo),
    })
      .then((res) => res.json())
      .then(() => {
        toast("this post is bookmarked");
        setBookmarkedDis((pb) => ({
          ...pb,
          [id]: true,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="">
        {isloading && (
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
      {data?.map((c, i) => (
        <div
          key={i}
          className="p-4 mb-5 rounded"
          style={{ backgroundColor: "#0F172A" }}
        >
          <h1 className="font-bold">
            <span className="text-lime-300">Q.</span> {c.title}
          </h1>
          <p className="text-sm">{c.description}</p>
          <div className="flex">
            {c.keywords &&
              c.keywords.map((keys, j) => (
                <p className="text-sm px-1 me-3 my-3" key={j}>
                  <span className="text-lime-300">#</span>
                  {keys.value}
                </p>
              ))}
          </div>
          {c.image && (
            <div>
              <img
                style={{ width: "100%", height: "300px" }}
                className="mb-3"
                src={c.image}
                alt=""
              />
            </div>
          )}
          {c.codeSnippet == "CodeSnippet" ? (
            ""
          ) : (
            <div
              className="bg-gray-700 p-3 my-3"
              style={{
                maxHeight: "300px",
                overflow: "auto",
              }}
            >
              <pre>
                <code className="text-sm">{c.codeSnippet}</code>
              </pre>
            </div>
          )}
          <div className="flex justify-between reaction-center">
            <div className="flex">
              <p className="me-12 text-sm"> upmarks {c?.upMark}</p>
              <p className="me-12 text-sm"> downmarks {c?.downMark}</p>
              <p className="text-sm">Answers {c?.comments?.length || 0}</p>
            </div>
            <div className="flex justify-around items-center posst-user">
              <img
                style={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "100%",
                }}
                src={c?.userImg}
                alt=""
              />
              {c.user && <p className="text-xs ms-2">{c?.user}</p>}
            </div>
          </div>

          {/* --------------------------------------------------------------- */}

          <div className="border-t mt-3">
            <div className="flex justify-between rounded border-gray-300 p-2">
              <button
                onClick={() => handleUpmark(c._id)}
                title="This post shows efforts and research and its usefull."
                disabled={disabled[c._id]}
              >
                <span className="reaction_icons">
                  {c.upMark ? <BiSolidUpArrow /> : <BiUpArrow />}
                </span>
              </button>
              <button
                onClick={() => handleDownmark(c._id)}
                title="This post dosn't shows any efforts and research and its unusefull."
                disabled={disabled[c._id]}
              >
                <span className="reaction_icons">
                  {c.downMark ? <BiSolidDownArrow /> : <BiDownArrow />}
                </span>
              </button>

              <button onClick={handleComment}>
                <span className="reaction_icons">
                  <FaDashcube
                    className={`${inputShow ? "text-lime-300" : ""}`}
                  />
                </span>
              </button>
              <button
                onClick={() => handleBookmark(c._id, i)}
                disabled={bookedmarkDis[c._id]}
              >
                <span className="reaction_icons">
                  <FaBookmark />
                </span>
              </button>
            </div>
            <div className={`mb-5 ${inputShow ? "" : "hidden"}`}>
              <form
                onSubmit={(event) => handleSubmit(event, c._id)}
                className="w-full flex items-center"
              >
                <textarea
                  rows="1"
                  name="comment"
                  className="bg-slate-900 border my-2 w-full p-1 me-3 rounded text-sm"
                  style={{ width: "85%" }}
                  id="commentTextarea"
                  ref={textareaRef}
                />
                <input
                  style={{
                    width: "15%",
                  }}
                  className="btn btn-sm bg-white text-black text-xs"
                  type="submit"
                  value="comments"
                />
              </form>
            </div>
            <div className="">
              <div className="">
                <p className="text-sm mb-5 mt-1">All comments</p>
                {c?.comments ? (
                  c?.comments
                    ?.slice()
                    .sort(
                      (a, b) =>
                        new Date(b.time).getTime() - new Date(a.time).getTime()
                    )
                    .map((m, x) => (
                      <div key={x} className="flex">
                        <div className="">
                          {m.commentorImg ? (
                            <img
                              style={{
                                width: "30px",
                                borderRadius: "100%",
                                height: "30px",
                                marginRight: "5px",
                              }}
                              src={
                                m.commentorImg
                                  ? m.commentorImg
                                  : "https://i.ibb.co/fvJSJ4P/User-Circle.png"
                              }
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          style={{
                            border: "1px solid #afafaf",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            padding: "8px",
                            width: "95%",
                            wordBreak: "break-word",
                          }}
                          className=""
                        >
                          <div className="comment-text">
                            <p className="text-sm">{m.comment}</p>
                          </div>
                          <div className="flex items-center justify-between border-t mt-2">
                            <div className="mt-1">
                              <p>
                                <span className="text-lime-300 text-xs">
                                  {new Date(m?.time).toLocaleString("en-US", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                  })}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center mt-2">
                              <p className="text-xs ms-3">{m.commentuser}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <>
                    <p className="text-sm text-lime-300">No comments yet</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default HomeComp;
