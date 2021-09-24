import React from "react";
import { Link } from "react-router-dom";
import "../css/landing-style.css";

const Landing = () => {
  return (
    <>
      <div className="landing-Logo">지구자구</div>
      <div className="landing-1">
        <nav>
          <ul className="landing-nav">
            <li>Video</li>
            <li>
              <Link to="/Auth">Login</Link>
            </li>
            <li>mission</li>
            <li>community</li>
            <li>Store</li>
            <li>Qr Code</li>
            <li></li>
          </ul>
        </nav>
      </div>
      <div className="landing-2">
        <div className="landing-2-textContainer">
          <div className="landing-2-MainText"></div>
          <div className="landing-2-SubText"></div>
        </div>
        <div className="landing-2-subContainer"></div>
      </div>
      <div className="landing-3">
        <div className="landing-3-maincontainer">
          <div className="landing-3-container"></div>
          <img alt="QR" />
        </div>
      </div>
    </>
  );
};

export default Landing;
