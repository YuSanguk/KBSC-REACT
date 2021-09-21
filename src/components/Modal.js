import React from "react";

const Modal = ({ itemObj }) => {
  return (
    <>
      <div>
        <h4>{itemObj.title}</h4>
        <p>{itemObj.text}</p>
        {itemObj.attachmentUrl && (
          <img
            width="50px"
            height="50px"
            alt="test"
            src={itemObj.attachmentUrl}
          ></img>
        )}
      </div>
    </>
  );
};

export default Modal;
