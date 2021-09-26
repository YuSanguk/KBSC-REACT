import React, { useState, useRef } from "react";
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";
import "../css/landing-style.css";
import Video1 from "../sourceImg/InfoVideo.mp4";
import Pdf from "../useing/Info.pdf";
import { FaRegBell, FaQrcode } from "react-icons/fa";
import { BiCommentError, BiStoreAlt, BiLogIn } from "react-icons/bi";

const Landing = () => {
  const [mode, setMode] = useState(true);
  const [num, setNum] = useState(-1);
  const text = [
    {
      main: "미션으로",
      text: "환경을 지키는 한걸음 실천해 보세요!",
    },
    {
      main: "커뮤니티에서",
      text: "환경을 지키는 방법을 공유해 보세요!",
    },
    {
      main: "스토어에서",
      text: "환경 보호의 증거를 구매해 보세요!",
    },
    {
      main: "QR을 통해",
      text: "지구자구 앱을 다운받으세요!",
    },
    {
      main: "지구자구와 함께해요",
      text: "지구자구 로그인",
    },
  ];

  function toDiv(name) {
    scroller.scrollTo(name, {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutQuint",
    });
  }

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
      <div className="landing-navigator">
        <ul>
          <li onClick={() => toDiv("landing-1")}>1</li>
          <li onClick={() => toDiv("landing-2")}>2</li>
          <li onClick={() => toDiv("landing-3")}>3</li>
          <li onClick={() => toDiv("landing-4")}>4</li>
        </ul>
      </div>
      <div className="landing-box">
        <div className="landing-Logo">
          <p>지구자구</p>
          <p>ZIGUZAGU</p>
        </div>
      </div>
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
                  {num === 4 ? (
                    <div>
                      <h1>{text[num].main}</h1>
                      <p className="landing-toLogin">
                        <Link to="/auth">{text[num].text}</Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3>{text[num].main}</h3>
                      <p>{text[num].text}</p>
                    </div>
                  )}
                </>
              )}
            </li>
            <li onClick={() => toggle(4)}>
              <BiLogIn />
              <p>Login</p>
            </li>
            <li onClick={() => toggle(0)}>
              <FaRegBell />
              <p>mission</p>
            </li>
            <li onClick={() => toggle(1)}>
              <BiCommentError />
              <p>Community</p>
            </li>
            <li onClick={() => toggle(2)}>
              <BiStoreAlt />
              <p>Store</p>
            </li>
            <li onClick={() => toggle(3)}>
              <FaQrcode />
              <p>QR Code</p>
            </li>
          </ul>
        </nav>
      </div>
      <div className="landing-2">
        <div className="landing-2-textContainer">
          <div className="landing-2-MainText">
            <p>환경을 보호하는 방법은</p>
            <p>여러분들도 이미 알고 있습니다</p>
          </div>
          <div className="landing-2-SubText">GuideLines for you</div>
        </div>
        <div className="landing-2-info">
          <div>LoremIpsum</div>
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
      <div className="landing-4"></div>
      <footer className="landing-footer">
        <p>지구자구</p>
        <a
          href={Pdf}
          target="_blank"
          without
          rel="noopener noreferrer"
          target="_blank"
        >
          개인정보처리방침
        </a>
      </footer>
    </>
  );
};

export default Landing;
