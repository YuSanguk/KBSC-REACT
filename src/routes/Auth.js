import { authService, firebaseInstance } from "fbase";
import React from "react";
import "../css/login-style.css";

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
        <div className="login-button-container">
          <button
            className="login-back"
            onClick={() => {
              window.location.assign("");
            }}
          >
            뒤로 이동
          </button>
          <button
            onClick={onSocialClick}
            name="google"
            className="Google-Login"
          >
            구글로 로그인하기
          </button>
        </div>
      </div>
    </>
  );
};
export default Auth;
