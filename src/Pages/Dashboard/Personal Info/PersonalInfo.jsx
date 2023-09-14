import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Authprovider/Auth";
import useFetch2 from "../../../Hooks/useFetch2";
import { ToastContainer, toast } from "react-toastify";
const imageAPI = import.meta.env.VITE_IMAGEAPI;
import { BeatLoader } from "react-spinners";

const PersonalInfo = () => {
  const imageURLPer = `https://api.imgbb.com/1/upload?key=${imageAPI}`;
  const { users } = useContext(AuthContext);
  // const { FetchData } = useFetch2("userinfoemail", users?.email);
  const { data: FetchData, refetch } = useFetch2(
    "userinfoemail",
    users?.email,
    "userinfoemail"
  );

  const [loading, setLoading] = useState(false);

  const [infos] = FetchData || [];
  const { image } = infos || [];

  console.log(FetchData);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imageURLPer, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((img) => {
        if (img.success) {
          const imgLink = img.data.display_url;
          const updateInfo = {
            name: data.name,
            image: imgLink,
            bio: data.bio,
          };
          fetch(
            `https://my-techfusion-server.onrender.com/updateInfo/${users?.email}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(updateInfo),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("response data", data);
              refetch();
              reset();
              toast("Changes completed");
              window.location.reload();
              setLoading(false);
            });
        }
      });
    console.log(data);
  };

  return (
    <section className="w-1/2 border border-lime-300 p-5 rounded-md personal_dash">
      <div className="w-full">
        <div className="my-5"></div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3 mb-5">
              <div className="flex justify-between items-start">
                <div className="">
                  <img
                    src={
                      image ? image : "https://i.ibb.co/fvJSJ4P/User-Circle.png"
                    }
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />
                  <div className="my-3">
                    <h2>Change Display Picture</h2>
                    <input
                      className="block text-xs"
                      type="file"
                      {...register("image", { required: false })}
                    />
                  </div>
                </div>
              </div>
              <div className="my-3 flex justify-between">
                <p className="text-sm">
                  Full name :{" "}
                  {FetchData ? (
                    <span className="text-lime-300 capitalize">
                      {FetchData.map((c) => c.name)}
                    </span>
                  ) : (
                    <span className="text-lime-300 capitalize">
                      {users.displayName}
                    </span>
                  )}
                </p>
                <p className="text-sm">
                  Joined Date : {""}
                  <span className="text-lime-300 ">
                    {FetchData?.map((c) => c?.joined) &&
                      new Date(FetchData?.map((c) => c?.joined)).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                  </span>
                </p>
              </div>
              <p className="text-sm">
                Bio :{" "}
                {FetchData ? (
                  <span className="text-lime-300 capitalize">
                    {FetchData.map((c) => c.bio)}
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>

            {/* ----------------------------------------------------- */}

            <label htmlFor="name">Name</label>
            <input
              required
              defaultValue={users.displayName}
              className="block w-full  mb-5 p-2 bg-transparent text-white border border-lime-900"
              {...register("name", { required: true })}
            />
            <label htmlFor="email">Email</label>
            <input
              defaultValue={users.email}
              readOnly
              className="block w-full mb-5 p-2 bg-transparent text-gray-300 border border-lime-900"
              {...register("email", { required: true })}
            />
            <label htmlFor="Bio">title</label>
            <input
              required
              defaultValue=""
              className="block w-full mb-5 p-2 bg-transparent text-white border border-lime-900"
              {...register("bio")}
            />
            {/* 
            <input
              className="btn btn-wide bg-transparent border border-lime-300 text-white"
              type="submit"
              value="Apply Changes"
            /> */}
            <button
              type="submit"
              className="btn btn-wide bg-slate-950 border border-lime-300 text-white mt-5"
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
                  <BeatLoader size={10} color="#fff" />
                </div>
              ) : (
                "apply changes"
              )}
            </button>
          </form>
        </div>
        <div className="mt-3">
          <p className="text-sm">
            Image changing is mandatory for every apply changes operation right
            now. Please select image and then go for the apply changes. If its
            not working then reload the page and select an Image and click apply
            changes.
          </p>
        </div>
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
    </section>
  );
};

export default PersonalInfo;
