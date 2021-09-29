import React from "react";

const Nweet = ({ nweetObj }) => {
  return (
    <>
      <div>
        {nweetObj.attachmentUrl && (
          <img
            alt="tips"
            src={nweetObj.attachmentUrl}
            width="50px"
            height="50px"
          ></img>
        )}
        <h4>{nweetObj.title}</h4>
        <h4>{nweetObj.text}</h4>
      </div>
    </>
  );
};

export default Nweet;
