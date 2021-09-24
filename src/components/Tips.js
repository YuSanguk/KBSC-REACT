import React from "react";

const Nweet = ({ nweetObj }) => {
  return (
    <>
      <div>
        <h4>{nweetObj.title}</h4>
        <h4>{nweetObj.text}</h4>
        {nweetObj.attachmentUrl && (
          <img
            alt="tips"
            src={nweetObj.attachmentUrl}
            width="50px"
            height="50px"
          ></img>
        )}
      </div>
    </>
  );
};

export default Nweet;
