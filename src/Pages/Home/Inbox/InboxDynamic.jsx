// import React from "react";
import { CircleLoader } from "react-spinners";
import useInbox from "../../../Hooks/useInbox";
import { AuthContext } from "../../../Authprovider/Auth";
import { useContext } from "react";
const InboxDynamic = () => {
  const { users } = useContext(AuthContext);
  const { isLoading } = useInbox("myinbox", users?.email);
  return (
    <section>
      <div
        style={{
          height: "680px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {isLoading ? (
          <div
            className="
            h-[10vh]
            flex 
            flex-col 
            justify-center 
            items-center"
          >
            <CircleLoader size={100} color="#36d7b7" />
          </div>
        ) : (
          <h1>
            Here is your inbox. Click on the users so can get there messages
            here ! 🚀
          </h1>
        )}
      </div>
    </section>
  );
};

export default InboxDynamic;
