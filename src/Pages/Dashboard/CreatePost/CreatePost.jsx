import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
// import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { AuthContext } from "../../../Authprovider/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import useFetch from "../../../Hooks/useFetch";
import useFetch2 from "../../../Hooks/useFetch2";
const imageAPI = import.meta.env.VITE_IMAGEAPI;

const CreatePost = () => {
  const imageURL = `https://api.imgbb.com/1/upload?key=${imageAPI}`;
  const { users } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState();
  const { register, handleSubmit, watch, reset } = useForm();
  const timestamp = new Date();
  const { data: FetchData } = useFetch2(
    "userinfoemail",
    users?.email,
    "userinfoEmail"
  );
  // const { FetchData } = useFetch("userinfoEmail", users?.email);

  const [info] = FetchData || [];
  const { name, image } = info || [];

  console.log(name, image);

  const onSubmit = (data) => {
    data.keywords = selectedOption;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imageURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((dataImage) => {
        if (dataImage.success) {
          const imgURL = dataImage.data.display_url;
          const { title, description, codeSnippet } = data;

          const userPost = {
            title,
            description,
            codeSnippet,
            keywords: selectedOption,
            user: users.email,
            image: imgURL,
            postTime: timestamp,
            userName: name,
            userImg: image ? image : "https://i.ibb.co/fvJSJ4P/User-Circle.png",
            upMark: 0,
            downMark: 0,
            answers: 0,
          };
          fetch("https://my-techfusion-server.onrender.com/userpost", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userPost),
          })
            .then((res) => res.json())
            .then((data) => {
              reset();
              toast("Your post is now in feed");
              console.log(data);
            });
        } else {
          const { title, description, codeSnippet } = data;
          const userPost = {
            title,
            description,
            codeSnippet,
            keywords: selectedOption,
            user: users.email,
            image: null,
            postTime: timestamp,
            userName: name,
            userImg: image ? image : "https://i.ibb.co/fvJSJ4P/User-Circle.png",
            upMark: 0,
            downMark: 0,
            answers: 0,
          };
          fetch("https://my-techfusion-server.onrender.com/userpost", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userPost),
          })
            .then((res) => res.json())
            .then((data) => {
              reset();
              toast("Your post is now in feed");
              console.log(data);
            });
        }
      });
  };

  const validateKeywords = () => {
    const selectedKeywords = watch("keywords");
    return selectedKeywords && selectedKeywords.length >= 3;
  };

  const options = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "C", label: "C" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "Ruby", label: "Ruby" },
    { value: "C++", label: "C++" },
    { value: "PHP", label: "PHP" },
    { value: "Swift", label: "Swift" },
    { value: "Go", label: "Go" },
    { value: "Rust", label: "Rust" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "SQL", label: "SQL" },
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Node.js", label: "Node.js" },
    { value: "Express.js", label: "Express.js" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Laravel", label: "Laravel" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: "TensorFlow", label: "TensorFlow" },
    { value: "PyTorch", label: "PyTorch" },
  ];

  return (
    <div className="create_dash w-1/2">
      <h1 className="text-xl mb-5">Post a question</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          required
          placeholder="Title"
          className="block w-full my-2 p-2 bg-white text-black"
          {...register("title", { required: true })}
        />
        <textarea
          required
          placeholder="Description"
          className="block w-full my-2 p-2 bg-white text-black"
          {...register("description", { required: true })}
          cols="70"
          rows="4"
        ></textarea>

        <textarea
          defaultValue="CodeSnippet"
          className="block w-full my-2 p-2 bg-white text-gray-500 text-sm"
          {...register("codeSnippet", { required: false })}
          cols="70"
          rows="8"
        ></textarea>
        <CreatableSelect
          required
          className="block w-full my-2 p-2 bg-white text-black"
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isMulti
        />
        <input
          type="file"
          className="block w-full my-2 p-2 bg-white text-black"
          {...register("image", { required: false })}
        />
        {/* errors will return when field validation fails  */}
        {/* {errors.title && <span>This field is required</span>} */}
        <input
          className="btn btn-wide bg-slate-950 border border-lime-300 text-white mt-5"
          type="submit"
        />
      </form>
      <div className="my-3">
        <p>
          You can post a question from here. you can add an image of your
          problems. after submit button post will appear on home page in
          descending order.
        </p>
      </div>
      <div className="mt-5 text-center lg:hidden">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-transparent border border-lime-300 drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
