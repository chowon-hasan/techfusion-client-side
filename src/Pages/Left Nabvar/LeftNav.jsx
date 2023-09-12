import { Link } from "react-router-dom";
import "./leftnav.css";
import {
  FaHome,
  FaLightbulb,
  FaProjectDiagram,
  FaShoppingBag,
  FaSlackHash,
  FaUsers,
} from "react-icons/fa";

const LeftNav = () => {
  return (
    <div className="fixed">
      <div className="">
        <ul className="left_nav">
          <li className="flex items-center">
            <FaHome className="me-2" />
            <Link to="/">Home</Link>
          </li>
          <li className="flex items-center">
            <FaLightbulb className="me-2" />
            <Link to="allquestions">All Questions</Link>
          </li>
          <li className="flex items-center">
            <FaSlackHash className="me-2" />
            <Link to="tags">Tags</Link>
          </li>
          <li className="flex items-center">
            <FaUsers className="me-2" />
            <Link to="users">Users</Link>
          </li>
          <li className="flex items-center">
            <FaShoppingBag className="me-2" />
            <Link to="market">Market Place</Link>
          </li>
          <li className="flex items-center">
            <FaProjectDiagram className="me-2" />
            <Link to="projectcont">Project contribution</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNav;
