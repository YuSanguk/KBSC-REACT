import React from "react";

const Items = ({ itemObj }) => {
  return (
    <>
      <li>
        <a>
          <img alt="img"></img>
          <p>{itemObj.title}</p>
          <p>{itemObj.text}</p>
        </a>
      </li>
    </>
  );
};

export default Items;
