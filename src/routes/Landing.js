import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import "../css/landing-style.css";
import Video1 from "../sourceImg/InfoVideo.mp4";
import { FaRegBell } from "react-icons/fa";

const Landing = () => {
  const [mode, setMode] = useState(true);
  const [num, setNum] = useState(-1);
  const text = [
    {
      main: "mission",
      text: "mission text",
    },
    {
      main: "community",
      text: "commnunity text",
    },
    {
      main: "store",
      text: "stotre text",
    },
    {
      main: "Qr code",
      text: "Qr text",
    },
  ];

  function toggle(number) {
    if (num === -1) {
      setMode(prev => !prev);
      setNum(number);
    } else if (num === number) {
      setMode(prev => !prev);
      setNum(-1);
    } else {
      setNum(number);
    }
  }

  return (
    <>
      <div className="landing-Logo">지구자구</div>
      <div className="landing-1">
        <nav>
          <ul className="landing-nav">
            <li className="landing-1-video">
              {mode ? (
                <>
                  <video preload="true" loop autoPlay>
                    <source src={Video1} type="video/mp4" />
                    good
                  </video>
                </>
              ) : (
                <>
                  <div>
                    <h3>{text[num].main}</h3>
                    <p>{text[num].text}</p>
                  </div>
                </>
              )}
            </li>
            <li>
              <Link to="/Auth">Login</Link>
            </li>
            <li
              onClick={() => {
                toggle(0);
              }}
              className="mission"
            >
              <FaRegBell className="mission" />
              <p>mission</p>
            </li>
            <li
              onClick={() => {
                toggle(1);
              }}
            >
              community
            </li>
            <li
              onClick={() => {
                toggle(2);
              }}
            >
              Store
            </li>
            <li
              onClick={() => {
                toggle(3);
              }}
            >
              Qr Code
            </li>
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
        <div className="landing-2-info">
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
