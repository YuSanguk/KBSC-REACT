import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { dbService } from "fbase";
import { Link } from "react-router-dom";
import DisplayTips from "./DisplayTips";

const Community = ({ userObj }) => {
  return (
    <div>
      <Link to="/community/write">Write</Link>
      <DisplayTips userObj={userObj} />
    </div>
  );
};

export default Community;
