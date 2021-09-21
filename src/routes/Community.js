import React from "react";
import { Link } from "react-router-dom";
import DisplayTips from "./DisplayTips";

const Community = ({ userObj, isLoggedIn }) => {
  return (
    <>
      <Link to="/community/write">Write</Link>
      <DisplayTips userObj={userObj} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default Community;
