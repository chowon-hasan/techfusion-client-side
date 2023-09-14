import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authprovider/Auth";
import logo from "../../assets/logo-light.png";
import { BeatLoader } from "react-spinners";

const Opening = () => {
  //   const [regError, setRegError] = useState("");
  const navigate = useNavigate();
  const { createUser, loading, setLoading } = useContext(AuthContext);
  const [signUpTimestamp, setSignUpTimestamp] = useState(null);
  const [regError, setRegError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const timestamp = new Date();
    setSignUpTimestamp(timestamp);
    createUser(data.email, data.password, data.name)
      .then((result) => {
        const createdUser = result;
        console.log(createdUser);
        const userinfo = {
          name: data.name,
          email: data.email,
          password: data.password,
          joined: timestamp,
        };
        navigate("/");
        fetch("https://my-techfusion-server.onrender.com/signedUserInfo", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userinfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      })
      .catch((error) => {
        setLoading(false);
        setRegError(error.message);
      });
  };

  return (
    <section className="min-h-screen flex items-center sign_section">
      <div className="container mx-auto">
        <div className="flex items-center sign_cont">
          <div className="w-1/2 sign_body">
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
          <div className="w-1/2 sign_body-2">
            <div className="my-5 text-center">
              <h1 className="font-bold text-white text-xl">Sign Up Here</h1>
            </div>
            <div className="w-2/4 mx-auto sign_form_body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  className="w-full bg-white text-black border rounded p-3 block mb-5"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white text-black border rounded p-3 block mb-5"
                  {...register("email", { required: true })}
                />
                <input
                  type="password"
                  placeholder="password"
                  className="w-full bg-white text-black border rounded p-3 block mb-5"
                  {...register("password", { required: true })}
                />

                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && (
                  <span className="block">This field is required</span>
                )}

                <div className="text-center">
                  {/* <input
                    className="btn btn-wide bg-lime-600 hover:bg-white hover:text-black border-0 text-white"
                    type="submit"
                  /> */}
                  <button
                    type="submit"
                    className="btn btn-wide bg-lime-600 hover:bg-white hover:text-black border-0 text-white"
                  >
                    {loading ? (
                      <div
                        className="
                            h-[10px]
                            flex 
                            flex-col 
                            justify-center 
                            items-center"
                      >
                        <BeatLoader size={10} color="#000" />
                      </div>
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </div>
              </form>
              <div className="text-center mt-5 text-black">
                <p className="text-red-500 my-3">{regError}</p>
                <p className="text-white">
                  Already have an account?
                  <Link to="/login" className="text-lime-300 ms-3">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opening;
