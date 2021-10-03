import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { Helmet } from "react-helmet";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // 로그인 되어있는지 확인
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <>
          <Helmet>
            <title>지구자구</title>
          </Helmet>
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
        </>
      ) : (
        "동기화 중"
      )}
      {/* <footer>&copy; {new Date().getFullYear()} CLEAN</footer> */}
    </>
  );
};

export default App;
