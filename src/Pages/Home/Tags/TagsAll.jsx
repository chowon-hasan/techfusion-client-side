import "../../../../src/responsives.css";
import useTags from "../../../Hooks/useTags";
import { CircleLoader } from "react-spinners";

const TagsAll = () => {
  const [data, isLoading] = useTags();
  return (
    <section className="min-screen tagss" style={{ width: "680px" }}>
      <div className="">
        {isLoading && (
          <div
            className="
              h-[70vh]
              flex 
              flex-col 
              justify-center 
              items-center"
          >
            <CircleLoader size={100} color="#36d7b7" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-5 tags_cont">
        {data?.map((c, i) => (
          <div
            key={i}
            className="border border-slate-500 rounded-md p-3 tags_body"
          >
            <h1 className="text-sm font-bold">
              <span className="text-lime-300">Q :</span> {c.name}
            </h1>
            <p className="text-sm">{c.description}</p>
            <p className="text-sm">Popularity : {c.popularity}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TagsAll;
