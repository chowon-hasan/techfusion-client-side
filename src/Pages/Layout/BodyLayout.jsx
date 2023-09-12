import "../../../src/responsives.css";
import HomeComp from "../Home/HomeComp";
import "./body.css";

//
const BodyLayout = () => {
  return (
    <section
      style={{ width: "100%", margin: "auto" }}
      className="mx-auto body-cont"
    >
      <div className="lg:container mx-auto">
        <div className="mainBody mx-auto">
          <HomeComp />
        </div>
      </div>
    </section>
  );
};

export default BodyLayout;
