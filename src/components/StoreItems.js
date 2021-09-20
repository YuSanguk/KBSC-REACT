import React from "react";

const Items = ({ itemObj }) => {
  return (
    <>
      <li>
        <img alt="img"></img>
        <p>{itemObj.title}</p>
        <p>{itemObj.text}</p>
      </li>
    </>
  );
};

export default Items;
