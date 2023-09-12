import { useContext } from "react";

import { AuthContext } from "../../../Authprovider/Auth";
import {
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
} from "recharts";
import useFetch2 from "../../../Hooks/useFetch2";
const data = [
  {
    name: "Page A",
    post: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    post: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    post: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    post: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    post: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    post: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    post: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Allpost = () => {
  const { users } = useContext(AuthContext);
  const { data: FetchData } = useFetch2("postbyuser", users?.email);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto">
        <div className="">
          <h1 className="my-5 font-bold text-3xl text-center">
            Your Post History
          </h1>
        </div>
        <div className="flex w-full justify-center p-5 allpost_dash">
          <div className="w-1/2 m-3 recharts_cont">
            <div className="">
              <h1 className="mb-5 text-center">
                Track your days of post a questions
              </h1>
              <BarChart
                className="mx-auto"
                width={500}
                height={300}
                data={data}
              >
                <Bar dataKey="post" fill="#00C9A7" />
                <Tooltip />
                <Legend />
              </BarChart>
            </div>
          </div>
          <div className="w-1/2 mx-auto flowchart_cont">
            <h1 className="mb-5 text-center">
              Track impresions that you got on post
            </h1>
            <AreaChart
              className="mx-auto"
              width={500}
              height={300}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="post"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="amt"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </div>
        </div>

        <div className="my-5 text-center">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-transparent border border-lime-300 drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>

        <p className="text-center">
          Your Total post number {FetchData?.length}
        </p>
        <div className="">
          <div className="w-3/4 mx-auto mypost_cont">
            {FetchData
              ? FetchData?.map((c, i) => (
                  <div
                    key={i}
                    className="border border-slate-700 rounded-md p-4 my-5 flex items-center mypost_card"
                  >
                    <div className="w-1/2 me-3 card-1-mypost">
                      <h1 className="mb-2 text-sm text-lime-300">
                        PostedOn :{" "}
                        <span className="text-white">
                          {c.postTime &&
                            new Date(c.postTime).toLocaleString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            })}
                        </span>
                      </h1>
                      {c.image ? (
                        <img
                          className="mx-auto h-96 mb-3"
                          src={c.image}
                          alt=""
                        />
                      ) : (
                        "No images were uploaded"
                      )}
                    </div>

                    <div className="w-1/2 ms-3 card-2-mypost">
                      <h2 className="mb-3 text-base font-bold text-white">
                        {c.title}
                      </h2>
                      <div
                        style={{
                          maxHeight: "50px",
                          overflow: "auto",
                          marginBottom: "15px",
                        }}
                      >
                        <p className="text-lime-300 text-sm">
                          Description :{" "}
                          <span className="text-white">{c.description}</span>
                        </p>
                      </div>
                      {c.keywords &&
                        c.keywords.map((k, i) => (
                          <span className="text-lime-300 text-sm my-5" key={i}>
                            #{k.value} &nbsp;
                          </span>
                        ))}
                      {c.codeSnippet == "CodeSnippet" ? (
                        ""
                      ) : (
                        <div
                          className="bg-gray-700 p-3 my-3"
                          style={{
                            maxHeight: "300px",
                            overflow: "auto",
                          }}
                        >
                          <pre>
                            <code className="text-sm">{c.codeSnippet}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : "You have not posted anything yet. To create your First post lets go on the 'Create a post' tab"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Allpost;
