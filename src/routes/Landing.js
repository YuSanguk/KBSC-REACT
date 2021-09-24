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
          <div className="landing-2-MainText">환경을 보호하는 방법은</div>
          <div className="landing-2-SubText">
            여러분들도 이미 알고 있습니다.
          </div>
          <div className="landing-2-subContainer">GuideLines for you</div>
        </div>
        <div landing-2-info>
          <div>1</div>
          <hr />
          <div>2</div>
          <hr />
          <div>3</div>
        </div>
      </div>
      <div className="landing-3">
        <img alt="" />
        <div className="landing-3-container">
          <p className="landing-3-prob">We Can Save</p>
          <p>" 작은 화면 속에서도</p>
          <p>지구를 지킬 수 있습니다. "</p>
        </div>
      </div>
      <footer className="landing-footer">
        <p>지구자구</p>
        <p>개인정보처리방침</p>
      </footer>
    </>
  );
};

export default Landing;
