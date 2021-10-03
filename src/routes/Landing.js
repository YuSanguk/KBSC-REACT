import React, { useState } from "react";
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";
import "../css/landing-style.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Video1 from "../sourceImg/InfoVideo.mp4";
import Pdf from "../useing/Info.pdf";
import img1 from "../sourceImg/main-i.webp";
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
      text: "로그인하러가기",
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
          <li onClick={() => toDiv("landing-1")}># MAIN</li>
          <li onClick={() => toDiv("landing-2")}># WHY</li>
          <li onClick={() => toDiv("landing-3")}># LET</li>
          <li onClick={() => toDiv("landing-4")}># START</li>
        </ul>
      </div>
      <div className="landing-box">
        <div className="landing-Logo">
          <p>지구자구</p>
          <p>ZIGUZAGU</p>
        </div>
      </div>
      <div className="landing-1">
        <LazyLoadImage
          effect="blur"
          alt="background"
          height="100%"
          width="100%"
          src={img1}
        />
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
                      <h1>{text[num].main}</h1>
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
              <p>Mission</p>
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
        <div className="landing-2-container">
          <p>잃어버린 푸른색의 지구를</p>
          <p>다시 되찾기 위해 고민했습니다</p>
        </div>
      </div>
      <div className="landing-3">
        <div className="landing-3-container">
          <p>그렇게 탄생한</p>
          <p>지구를 지키기 위한 서비스</p>
        </div>
      </div>
      <div className="landing-4">
        <div className="landing-4-container">
          <p>지구자구와 함께</p>
          <p>지구를 초록빛으로 물들여봐요</p>
        </div>
      </div>
      <footer className="landing-footer">
        <p>지구자구</p>
        <a href={Pdf} target="_blank" rel="noopener noreferrer" target="_blank">
          개인정보처리방침
        </a>
      </footer>
    </>
  );
};

export default Landing;
