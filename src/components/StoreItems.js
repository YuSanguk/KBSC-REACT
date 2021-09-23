import React from "react";
import { Link } from "react-router-dom";

const Items = ({ itemObj }) => {
  const pos = "/storeitem?";
  return (
    <>
      <Link to={pos + "id=" + itemObj.id}>
        <li>
          <img alt="img"></img>
          <p>{itemObj.title}</p>
          <p>{itemObj.text}</p>
        </li>
      </Link>
    </>
  );
};

export default Items;
