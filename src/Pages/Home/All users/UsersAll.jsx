// import React from "react";
import "../../../../src/responsives.css";
import { CircleLoader } from "react-spinners";
import useUsers from "../../../Hooks/useUsers";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
// import useFetch from "../../../Hooks/useFetch";
import { AuthContext } from "../../../Authprovider/Auth";
import useFetch2 from "../../../Hooks/useFetch2";

const UsersAll = () => {
  const [singleUsers, isLoading, refetch] = useUsers();
  const { users } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(false);
  const [knockUser, setUser] = useState(null);
  // const { FetchData } = useFetch("userinfoemail", users?.email);
  // const [data] = FetchData || [];
  // const { image } = data || {};
  const { data: FetchData } = useFetch2(
    "userinfoemail",
    users?.email,
    "userinfoemail2"
  );
  const [data] = FetchData || [];
  const { image } = data || {};

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data, email) => {
    const messagesData = {
      data,
      email: users?.email,
      senderImage: FetchData ? FetchData.map((c) => c.image) : "no image",
    };
    fetch(`https://my-techfusion-server.onrender.com/messages/${email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(messagesData),
    })
      .then((res) => res.json())
      .then((resdata) => {
        reset();
        if (resdata) {
          refetch();
          setSelectedUser(false);
          console.log(singleUsers);
        }
      });
  };

  const openModal = (user) => {
    setSelectedUser(true);
    setUser(user);
  };

  const Modal = ({ user }) => {
    const modalStyle = {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "100",
    };

    const contentStyle = {
      backgroundColor: "#0F172A",
      padding: "20px",
      borderRadius: "8px",
      width: "350px",
      color: "#ffffff",
    };

    return (
      <>
        <div className="" style={modalStyle}>
          <div className="" style={contentStyle}>
            <div
              style={{ backgroundColor: "#020617" }}
              className="flex items-center px-3 py-2"
            >
              <div className="">
                {user.image ? (
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "100%",
                    }}
                    src={user.image}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "100%",
                    }}
                    src="https://i.ibb.co/fvJSJ4P/User-Circle.png"
                    alt=""
                  />
                )}
              </div>
              <div className="ms-3">
                <h1 className="text-sm capitalize">{user?.name}</h1>
                <p className="text-xs text-lime-300">{user.email}</p>
              </div>
            </div>

            {/* ------------------------------------ */}
            <div className="bg-gray-300">
              <div className="pt-2">
                <p
                  style={{ fontSize: "10px", fontWeight: "bold" }}
                  className="text-center text-black"
                >
                  Let`s foster a positive and respectful environment where
                  everyone feels safe and valued.
                </p>
              </div>
              <div
                style={{ minHeight: "150px" }}
                className="px-3 flex justify-end items-end"
              >
                <div className="">
                  <div>
                    {user.inbox &&
                      user.inbox.map((ui, i) =>
                        ui.sender == users.email ? (
                          <div key={i} className="">
                            <div className="">
                              {ui.messages.map((um, i2) => (
                                <div
                                  key={i2}
                                  className="text-black text-end rounded-md bg-gray-100 px-2 my-3"
                                >
                                  <h1 className="text-sm">{um.message}</h1>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                  </div>
                </div>
                {user?.inbox && (
                  <div className="my-3 ms-2">
                    <img
                      src={
                        image
                          ? image
                          : "https://i.ibb.co/fvJSJ4P/User-Circle.png"
                      }
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "100%",
                      }}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>

            {/* -------------------------------------- */}
            <div style={{ backgroundColor: "#020617" }} className="px-1">
              <form
                onSubmit={handleSubmit((data) => onSubmit(data, user.email))}
              >
                <input
                  className="rounded-md bg-white text-black ps-2 w-full mt-3"
                  defaultValue=" "
                  {...register("message")}
                />
                <div className="text-center">
                  <input
                    className="btn btn-xs text-lime-300 capitalize my-2"
                    type="submit"
                    value="send"
                  />
                </div>
              </form>
            </div>
            <button
              onClick={() => setSelectedUser(false)}
              className="btn btn-xs mt-5 bg-gray-200 text-black capitalize"
            >
              close
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <section className="min-screen users" style={{ width: "680px" }}>
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
      <div className="grid grid-cols-2 gap-5 users_cont">
        {singleUsers?.map((user, i) => (
          <div
            key={i}
            className="border border-slate-500 rounded-md p-3 users_body"
          >
            <div className="flex justify-between">
              <div className="">
                {user.image ? (
                  <img
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "100%",
                    }}
                    src={user.image}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "100%",
                    }}
                    src="https://i.ibb.co/fvJSJ4P/User-Circle.png"
                    alt=""
                  />
                )}
              </div>
              <div className="flex">
                <a href={`mailto:${user.email}`}>
                  <FaEnvelope className="text-lime-300 me-3" />
                </a>
                <div className="">
                  {/* Open the modal using ID.showModal() method */}
                  <div className="">
                    <button onClick={() => openModal(user)}>
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h1 className=" font-bold mt-2">
              <span className="text-sm text-lime-300"></span> {user.name}
            </h1>
            <p className="text-xs">title : {user.bio}</p>
            <p className="text-xs">
              email : <span className="text-lime-300"> {user.email}</span>
            </p>
            <p className="text-xs">
              Joined Date : {""}
              <span className="text-lime-300">
                {new Date(user.joined ? user.joined : "").toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}
              </span>
            </p>
            <div className=""></div>
          </div>
        ))}
      </div>
      {selectedUser && <Modal user={knockUser} />}
    </section>
  );
};

export default UsersAll;
