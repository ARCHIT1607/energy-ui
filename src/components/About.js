import React from "react";
import "./About.css";
import highlight1 from "./highlight1.png";
import highlight2 from "./highlight2.png";
import highlight3 from "./highlight3.png";
function About() {
  return (
    <>
      <div className="container" id="hightlights">
        <h2>Highlights</h2>
        <div className="row">
          <div className="col-lg-6">
            <img src={highlight1} alt="" height={300} width={300} />
          </div>
          <div className="col-lg-6">
            <p>
              Meter readings are important because they enable us to provide you
              with an accurate bill based on the energy you have used. If you
              want to familiarise yourself with how to take a reading of your
              meter, you can find out how
            </p>
          </div>

          <div className="col-lg-6">
            <img src={highlight2} alt="" height={300} width={300} />
          </div>
          <div className="col-lg-6">
            <p>
              You can view your bills for all your current and previous months.
              We also provide option to pay your bill online. A customer can
              view and pay the latest unpaid bill with energy credit*
            </p>
          </div>

          <div className="col-lg-6">
            <img src={highlight3} alt="" height={300} width={300} />
          </div>
          <div className="col-lg-6">
            <p>A customer can top up the credit with a valid EVC*.
                One EVC can be used once only and it cannot be reused again.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
