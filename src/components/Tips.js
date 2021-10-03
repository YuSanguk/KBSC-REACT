import React from "react";

const Nweet = ({ nweetObj }) => {
  return (
    <>
      <div>
        <h4>{nweetObj.title}</h4>
        <p>{nweetObj.createdDate}</p>
      </div>
    </>
  );
};

export default Nweet;
