import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Authprovider/Auth";
import useFetch2 from "../../Hooks/useFetch2";

const Dashboard = () => {
  const { users, logout } = useContext(AuthContext);
  const { data: FetchData } = useFetch2("userinfoemail", users?.email);
  const [infoes] = FetchData || [];
  const { image, name, bio } = infoes || [];

  const handleLogout = () => {
    logout();
  };
  return (
    <section>
      <div className="">
        <div className="">
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center bg-slate-950 p-5">
              {/* Page content here */}
              <Outlet />
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <div className="menu p-0 w-80 h-full bg-slate-900 text-base-content ">
                {/* Sidebar content here */}
                <div className="text-center mb-5 mt-8">
                  <Link to="/dashboard">
                    <div className="flex justify-center">
                      <div
                        style={{
                          height: "80px",
                          width: "80px",
                          border: "2px solid #bef264",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "100%",
                          }}
                          className="rounded-full"
                          src={
                            image
                              ? image
                              : "https://i.ibb.co/fvJSJ4P/User-Circle.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
                  {FetchData ? (
                    <h1 className="mt-2 text-xl capitalize text-white">
                      {name}
                    </h1>
                  ) : (
                    <h1 className="mt-2 text-xl capitalize text-white">
                      {users.displayName}
                    </h1>
                  )}

                  {FetchData ? (
                    <h1 className="mt-2 text-sm capitalize text-white">
                      {bio}
                    </h1>
                  ) : (
                    ""
                  )}
                </div>

                <NavLink
                  to="/dashboard/personal"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white p-5 bg-slate-950 mb-4"
                      : "text-white p-5 bg-slate-900 mb-4"
                  }
                >
                  Personal Information
                </NavLink>

                <NavLink
                  to="/dashboard/create"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white p-5 bg-slate-950 mb-4"
                      : "text-white p-5 bg-slate-900 mb-4"
                  }
                >
                  Create a Post
                </NavLink>
                <NavLink
                  to="/dashboard/allPost"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white p-5 bg-slate-950 mb-4"
                      : "text-white p-5 bg-slate-900 mb-4"
                  }
                >
                  All Post
                </NavLink>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white p-5 bg-slate-950 mb-4"
                      : "text-white p-5 bg-slate-900 mb-4"
                  }
                >
                  Home
                </NavLink>
                <div className="ms-5 mt-2">
                  <button
                    onClick={handleLogout}
                    className="text-white font-2xl btn btn-wide bg-transparent border border-lime-300"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
