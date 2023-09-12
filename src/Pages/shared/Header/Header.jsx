/* eslint-disable react/prop-types */
import "../../../../src/responsives.css";
import { Link } from "react-router-dom";
import {
  FaBookmark,
  FaHandsHelping,
  FaHome,
  FaLightbulb,
  FaMedal,
  FaNewspaper,
  FaPaperPlane,
  FaProjectDiagram,
  FaShoppingBag,
  FaSlackHash,
  FaUsers,
} from "react-icons/fa";
import logo2 from "../../../assets/logo-light.png";
import "./header.css";
import { useContext } from "react";
import { AuthContext } from "../../../Authprovider/Auth";
import useFetch2 from "../../../Hooks/useFetch2";

const Header = () => {
  const { users } = useContext(AuthContext);
  const { data: FetchData } = useFetch2(
    "userinfoemail",
    users.email,
    "userinfoemail4"
  );

  const [infoe] = FetchData || [];
  const { image } = infoe || [];

  return (
    <section className="border-b border-white w-full z-1 backdrop-blur-sm bg-gray/30 header">
      <div className="lg:container mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 navbar_left"
              >
                <li>
                  <Link className="mb-3" to="/">
                    {" "}
                    <FaHome /> Home
                  </Link>
                </li>
                <li title="Inbox">
                  <Link className="mb-3" to="inbox">
                    <FaPaperPlane /> Inbox
                  </Link>
                </li>
                <li title="Bookmarks">
                  <Link className="mb-3" to="bookmarks">
                    <FaBookmark /> Bookmarks
                  </Link>
                </li>
                <li title="Help">
                  <Link className="mb-3" to="help">
                    <FaHandsHelping /> Help Center
                  </Link>
                </li>
                <li title="Quiz">
                  <Link className="mb-3" to="quiz">
                    <FaMedal /> Quiz
                  </Link>
                </li>
                <li>
                  <Link className="mb-3" to="allquestions">
                    {" "}
                    <FaLightbulb /> All Questions
                  </Link>
                </li>
                <li>
                  <Link className="mb-3" to="tags">
                    <FaSlackHash /> Tags
                  </Link>
                </li>
                <li>
                  <Link className="mb-3" to="users">
                    <FaUsers /> Users
                  </Link>
                </li>
                <li>
                  <Link className="mb-3" to="market">
                    <FaShoppingBag /> Market Place
                  </Link>
                </li>
                <li>
                  <Link className="mb-3" to="projectcont">
                    <FaProjectDiagram /> Project contribution
                  </Link>
                </li>
                <li>
                  <Link className="mb-3" to="news">
                    <FaNewspaper /> News
                  </Link>
                </li>
              </ul>
            </div>
            {/* dextop view */}
            <a href="/">
              <img className="logo" src={logo2} alt="" />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="flex searchInput">
              <input
                type="text"
                className="w-full bg-transparent p-2 border py-1 rounded"
              />
              <input
                type="button"
                value="Search"
                className="btn btn-sm bg-gray-300 text-black ms-2"
              />
            </ul>
          </div>
          <div className="navbar-end">
            <div className="">
              <ul className="profiles-bar">
                <li title="Inbox" className="hides">
                  <Link to="inbox">
                    <FaPaperPlane />
                  </Link>
                </li>
                <li title="Bookmarks" className="hides">
                  <Link to="bookmarks">
                    <FaBookmark />
                  </Link>
                </li>
                <li title="Help" className="hides">
                  <Link to="help">
                    <FaHandsHelping />
                  </Link>
                </li>
                <li title="Quiz" className="hides">
                  <Link to="quiz">
                    <FaMedal />
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <div className="ms-3">
                      <div className="user_icon_box">
                        <img
                          className="user_icon"
                          src={
                            image
                              ? image
                              : "https://i.ibb.co/fvJSJ4P/User-Circle.png"
                          }
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
