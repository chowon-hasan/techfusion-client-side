// import React from 'react';
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Authprovider/Auth";
import { useForm } from "react-hook-form";
import useFetch2 from "../../../Hooks/useFetch2";

const Messages = () => {
  const { email: paramsEmail } = useParams();
  const { users } = useContext(AuthContext);
  const { data: myFetchedData, refetch } = useFetch2(
    "myinbox",
    users?.email,
    "myinbox"
  );
  const { data: FetchData } = useFetch2(
    "userinfoemail",
    users?.email,
    "userinfo"
  );
  const [infos] = FetchData || [];
  const { image } = infos || [];

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const messagesData = {
      data,
      email: users?.email,
      senderImage: image ? image : "https://i.ibb.co/fvJSJ4P/User-Circle.png",
    };
    fetch(
      `https://my-techfusion-server.onrender.com/inboxmessages/${paramsEmail}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(messagesData),
      }
    )
      .then((res) => res.json())
      .then((resdata) => {
        refetch();
        reset();
        console.log(resdata);
      });
    console.log(data);
  };

  return (
    <section style={{}}>
      <div className="text-center border-b">
        <h1 className="text-sm mb-2">
          messeges with <span className="text-lime-300">{paramsEmail}</span>{" "}
        </h1>
      </div>

      <div style={{ height: "600px", overflow: "scroll" }} className="">
        {myFetchedData?.map(
          (myallData) =>
            myallData.inbox &&
            myallData.inbox.map((myinbox, i) => (
              <div key={i} className="left-div mt-3">
                {myinbox?.sender == paramsEmail ? (
                  <>
                    {myinbox.messages.map((rm, i) => (
                      <>
                        <div key={i} className="">
                          <div className="text-center">
                            <span className="text-white text-xs">
                              {rm.timeStamp &&
                                new Date(rm.timeStamp).toLocaleString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                })}
                            </span>
                          </div>
                          <div className="flex mb-2 p-3">
                            <div className="">
                              <img
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "100%",
                                  marginRight: "10px",
                                }}
                                src={myinbox?.senderImage}
                                alt=""
                              />
                            </div>
                            <div className="">
                              <p>{rm.message}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                    {myallData.sentMessages &&
                      myallData.sentMessages.map((mysent) =>
                        mysent.receiver == myinbox?.sender ? (
                          <>
                            <div className="p-3 text-center">
                              {mysent.messages.map((sm, i) => (
                                <>
                                  <span className="text-white text-xs">
                                    {sm.timeStamp &&
                                      new Date(sm.timeStamp).toLocaleString(
                                        "en-US",
                                        {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          month: "short",
                                          day: "2-digit",
                                          year: "numeric",
                                        }
                                      )}
                                  </span>
                                  <div className="flex justify-end items-center">
                                    <span key={i}>{sm.message}</span>
                                    <img
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "100%",
                                        marginLeft: "10px",
                                      }}
                                      src={
                                        image
                                          ? image
                                          : "https://i.ibb.co/fvJSJ4P/User-Circle.png"
                                      }
                                      alt=""
                                    />
                                  </div>
                                </>
                              ))}
                            </div>
                          </>
                        ) : (
                          ""
                        )
                      )}
                  </>
                ) : (
                  ""
                )}
              </div>
            ))
        )}
      </div>
      <div className="">
        <div style={{ backgroundColor: "#020617" }} className="px-1">
          <form onSubmit={handleSubmit(onSubmit)}>
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
      </div>
    </section>
  );
};

export default Messages;
