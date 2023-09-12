import { useContext, useState } from "react";

import { AuthContext } from "../../Authprovider/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import logo from "../../assets/logo-light.png";

const Login = () => {
  const { signInUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        const logInUser = result.user;
        console.log(result, logInUser);
        reset();
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  // const handlePopup = () => {
  //   const timestamp = new Date();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const logedUser = result.user;
  //       const userInfo = {
  //         name: logedUser.displayName,
  //         email: logedUser.email,
  //         joined: timestamp,
  //       };
  //       navigate("/home");
  //       fetch("https://my-techfusion-server.onrender.com/popupuser", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(userInfo),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //         });
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error.message);
  //     });
  // };

  return (
    <section className="min-h-screen flex items-center log_section">
      <div className="container mx-auto">
        <div className="flex items-center login_cont">
          <div className="w-1/2 login_card">
            <img src={logo} alt="" />
            <p className="text-sm mt-5">
              Welcome to TechFusion, the innovative online platform that
              combines the best of Stack Overflow`s knowledge-sharing prowess
              with a touch of Facebook`s social interactivity. 🚀
              <br /> Are you tired of searching through countless forums and
              threads for the answers to your pressing tech questions? Look no
              further. TechFusion is here to revolutionize how you interact with
              technology, providing you with a one-stop destination for all your
              technical queries and beyond. <br /> Imagine a space where
              developers, engineers, and enthusiasts unite to discuss ideas,
              troubleshoot challenges, and share their expertise. Whether you`re
              a coding novice seeking guidance or a seasoned pro looking to
              exchange insights, TechFusion brings you a seamless fusion of
              learning, problem-solving, and networking. <br /> TechFusion isn`t
              just about code – it`s about uniting people who are passionate
              about pushing the boundaries of technology. Share your projects,
              showcase your accomplishments, and get inspired by the incredible
              feats of others. Our platform transcends traditional boundaries to
              create an environment where collaboration breeds innovation.{" "}
              <br /> Join us in this exciting journey as we redefine how
              technology and community interlace. Be a part of TechFusion and
              experience a synergy that`s more than the sum of its parts. The
              fusion of knowledge, interaction, and inspiration awaits you.
              🌐🤝🔗 <br /> Get ready to embark on a new era of digital
              collaboration – <br />
              <span className="font-bold">welcome to TechFusion!</span>
            </p>
          </div>
          <div className="w-1/2 login_form">
            <div className="my-5 text-center">
              <h1 className="font-bold text-white text-xl">
                Please Log In Here
              </h1>
            </div>
            <div className="w-2/4 mx-auto login_form_body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="email"
                  className="w-full p-3 bg-white text-black border mb-5 rounded"
                  {...register("email", { required: true })}
                />
                <input
                  type="password"
                  className="w-full p-3 bg-white text-black border mb-5 rounded"
                  {...register("password", { required: true })}
                />

                {errors.exampleRequired && (
                  <span className="block text-red-700">
                    This field is required
                  </span>
                )}

                <div className="text-center">
                  <input
                    className="btn btn-wide border-0 bg-lime-600 text-white hover:bg-white hover:text-black"
                    type="submit"
                  />
                </div>
              </form>
              <div className="text-center mt-5 text-black">
                <p className="text-red-500 my-3">{errorMessage}</p>
                <p className="text-white">
                  Do not have an account?
                  <Link to="/signin" className="ms-2 text-lime-300">
                    Register here
                  </Link>
                </p>
              </div>
              <div className="text-center mt-5 text-white hidden">
                <p className="mt-3">Or you can sign in with</p>
                <div className="">
                  <div className="">
                    <button className="btn bg-lime-600 mt-5 text-white">
                      <FaGoogle className="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
