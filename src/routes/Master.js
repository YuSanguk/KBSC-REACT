import React from "react";
import { dbService } from "fbase";

const Master = ({ userObj }) => {
  const check = () => {
    if (userObj.uid == "rPG81P80MydSfqia3UsTJv2zqSZ2") {
      console.log("welcome master");
    } else {
      window.location.assign("");
    }
  };
  check();
  return (
    <>
      <div>Master Page</div>
    </>
  );
};

export default Master;
