// import React from 'react';
import "../../../../src/responsives.css";
import { useEffect, useState } from "react";

const ProjectCont = () => {
  const [languages, setlanguages] = useState();
  useEffect(() => {
    fetch("/language.json")
      .then((res) => res.json())
      .then((resdata) => {
        console.log(resdata);
        setlanguages(resdata);
      });
  }, []);
  return (
    <section className="projects" style={{ width: "680px" }}>
      <div>
        <h1 className="mb-5 font-bold text-lg">
          Explore project you are interested in
        </h1>
        <div className="grid grid-cols-4 gap-5 project_cont">
          {languages?.map((lang, i) => (
            <div className="pro_card" key={i}>
              <img
                style={{ width: "100px", height: "70px" }}
                src={lang.image}
                alt=""
              />
              <h1>{lang.name}</h1>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <p className="text-lime-300">
            This feature is will active soon. User can also contribute their
            project here.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectCont;
