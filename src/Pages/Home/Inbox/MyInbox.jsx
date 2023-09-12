import { useContext } from "react";
import useInbox from "../../../Hooks/useInbox";
import { AuthContext } from "../../../Authprovider/Auth";
import { Link, Outlet } from "react-router-dom";

const MyInbox = () => {
  const { users } = useContext(AuthContext);
  const { data: myFetchedData } = useInbox("myinbox", users?.email);
  const [infos] = myFetchedData || [];
  const { image } = infos || [];

  console.log(myFetchedData);

  return (
    <section className="min-screen inbox" style={{ width: "680px" }}>
      <div className="border">
        <div className="heading-part flex justify-between items-center bg-slate-800 p-3">
          <div className="">
            <h1>Chats</h1>
          </div>

          <div className="">
            <h1 className="text-sm">{users?.displayName}</h1>
            <p className="text-lime-300 text-xs">{users?.email}</p>
          </div>

          <div className="">
            <img
              style={{ width: "40px", height: "40px", borderRadius: "100%" }}
              src={image ? image : "https://i.ibb.co/fvJSJ4P/User-Circle.png"}
              alt=""
            />
          </div>
        </div>

        <div className="flex chat_body">
          <div className="w-2/4 myinbox-chathead">
            {myFetchedData?.map(
              (myallData) =>
                myallData.inbox &&
                myallData.inbox.map((myinbox, i) => (
                  <div key={i} className="chats-section">
                    <div className="border-b p-2 py-3 flex items-center">
                      <Link
                        to={`/inbox/${myinbox.sender}`}
                        className="chat-heads flex items-center"
                      >
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "100%",
                            marginRight: "10px",
                          }}
                          src={myinbox.senderImage}
                          alt=""
                        />
                        <h1 className="text-xs">{myinbox?.sender}</h1>
                      </Link>
                    </div>
                  </div>
                ))
            )}
          </div>
          <div className="w-full p-2 border-l">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyInbox;
