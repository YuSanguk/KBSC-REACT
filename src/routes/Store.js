import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { dbService } from "fbase";
import { Link } from "react-router-dom";

const store = ({ userObj }) => {
  return (
    <>
      <Link to="/store/item">Assign</Link>
      <div>
        <ul>
          <li>hihi</li>
          <li>hihihi</li>
          <li>lili</li>
        </ul>
      </div>
    </>
  );
};
export default store;
