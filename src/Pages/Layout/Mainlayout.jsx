import "../../../src/responsives.css";
import { Outlet } from "react-router-dom";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";
import LeftNav from "../Left Nabvar/LeftNav";
import RightNav from "../Right Navbar/RightNav";
import "./body.css";

const Mainlayout = () => {
  return (
    <div className="">
      <Header />
      <div className="md:container mx-auto py-5 mt-16 min-h-screen">
        <div className="flex justify-center">
          <div className="leftNav">
            <LeftNav />
          </div>
          <Outlet />
          <div className="rightNav">
            <RightNav />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mainlayout;
