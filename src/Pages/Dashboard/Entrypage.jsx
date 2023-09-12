import { useContext } from "react";
import logo from "../../assets/logo-light.png";
import { AuthContext } from "../../Authprovider/Auth";
import "../../../src/responsives.css";

const Entrypage = () => {
  const { users } = useContext(AuthContext);
  return (
    <div className="w-1/2 entry-dash">
      <img src={logo} alt="" />
      <h1 className="mt-5">
        Hello{" "}
        <span className="text-lime-300 capitalize">{users?.displayName}</span>,
        Welcome to Your Dashboard! <br /> Here's your space to explore, create,
        and connect. Dive into your projects, stay up-to-date with your latest
        activities, and uncover insights that drive your tech journey forward.
        Let's make today productive and inspiring! 🚀"
      </h1>
      <div className="mt-5 text-center">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-transparent border border-lime-300 drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="mt-5 flex justify-center items-center entry-cont">
        <div className="rounded p-3 w-1/2 bg-teal-600 entry-card">
          <h1 className="font-bold mb-2">🚀 Learn</h1>
          <p className="text-sm">
            Dive into the world of programming languages, explore cutting-edge
            frameworks, and unravel the mysteries of algorithms. Our
            user-friendly interface ensures that learning remains an exciting
            pursuit, one where you can progress at your own pace.
          </p>
        </div>
        <div className="rounded p-3 w-1/2 mx-2 bg-cyan-600 entry-card">
          <h1 className="font-bold mb-2">🚀 Question</h1>
          <p className="text-sm">
            Ask, discuss, and share your insights – because in the world of
            technology, there's always more to learn. Our user-friendly
            interface ensures that knowledge exchange remains a seamless
            experience, helping you find answers that illuminate the path
            forward.
          </p>
        </div>
        <div className="rounded p-3 w-1/2 bg-indigo-400 entry-card">
          <h1 className="font-bold mb-2">🚀 Comment</h1>
          <p className="text-sm">
            Comment, engage, and collaborate, because in the world of
            technology, diversity of thought fuels innovation. Our user-friendly
            interface ensures that your interactions remain seamless, enriching
            your learning experience and enabling you to connect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Entrypage;
