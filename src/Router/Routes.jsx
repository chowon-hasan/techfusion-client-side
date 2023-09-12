import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Pages/Layout/Mainlayout";
import BodyLayout from "../Pages/Layout/BodyLayout";
import Opening from "../Pages/Opening page/Opening";
import Login from "../Pages/Opening page/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Entrypage from "../Pages/Dashboard/Entrypage";
import CreatePost from "../Pages/Dashboard/CreatePost/CreatePost";
import PersonalInfo from "../Pages/Dashboard/Personal Info/PersonalInfo";
import Allpost from "../Pages/Dashboard/AllPost/Allpost";
import AllQus from "../Pages/Home/All qusetion/AllQus";
import TagsAll from "../Pages/Home/Tags/TagsAll";
import UsersAll from "../Pages/Home/All users/UsersAll";
import MyInbox from "../Pages/Home/Inbox/MyInbox";
import InboxDynamic from "../Pages/Home/Inbox/InboxDynamic";
import Messages from "../Pages/Home/Inbox/Messages";
import Bookmarks from "../Pages/Home/Bookmarks/Bookmarks";
import HelpCenter from "../Pages/Home/Help/HelpCenter";
import Market from "../Pages/Home/Market/Market";
import ProjectCont from "../Pages/Home/Project contribution/ProjectCont";
import Quiz from "../Pages/Home/Quiz/Quiz";
import News from "../Pages/Home/news/News";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Mainlayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <BodyLayout />,
      },
      {
        path: "/allquestions",
        element: <AllQus />,
      },
      {
        path: "/tags",
        element: <TagsAll />,
      },
      {
        path: "/users",
        element: <UsersAll />,
      },
      {
        path: "/help",
        element: <HelpCenter />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/market",
        element: <Market />,
      },
      {
        path: "/projectcont",
        element: <ProjectCont />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/inbox",
        element: <MyInbox />,
        children: [
          {
            path: "/inbox",
            element: <InboxDynamic />,
          },
          {
            path: "/inbox/:email",
            element: <Messages />,
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <Opening />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Entrypage />,
      },
      {
        path: "/dashboard/personal",
        element: <PersonalInfo />,
      },
      {
        path: "/dashboard/allPost",
        element: <Allpost />,
      },
      {
        path: "/dashboard/create",
        element: <CreatePost />,
      },
    ],
  },
]);
export default routes;
