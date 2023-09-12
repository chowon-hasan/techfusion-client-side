import { useContext } from "react";
import { AuthContext } from "../Authprovider/Auth";
import { Navigate, useLocation } from "react-router-dom";
import { CircleLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { users, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div>
        <div
          className="
    h-[70vh]
    flex 
    flex-col 
    justify-center 
    items-center 
  "
        >
          <CircleLoader size={100} color="#36d7b7" />
        </div>
      </div>
    );
  }
  if (users) {
    return children;
  }

  return (
    <Navigate to={"/signin"} replace state={{ from: location }}></Navigate>
  );
};

export default PrivateRoute;
