import React from "react";
import { authService, firebaseInstance } from "fbase";
import "../css/login-style.css";
import { FaArrowLeft, FaGoogle } from "react-icons/fa";

const Auth = () => {
  const onSocialClick = async event => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    try {
      await authService.signInWithPopup(provider);
    } catch (error) {}
  };
  return (
    <>
      <div className="login-container">
        <FaArrowLeft
          className="login-back"
          onClick={() => {
            window.location.assign("");
          }}
        />
        <div className="login-button-container">
          <p>
            버튼을 눌렀는데 로그인 창이 뜨지 않는다면 5초정도 기다린뒤 다시
            눌러주세요.
          </p>
          <button onClick={onSocialClick} name="google" className="login-icon">
            <FaGoogle className="login-google-icon" />
            <span>Sign In Google</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default Auth;
