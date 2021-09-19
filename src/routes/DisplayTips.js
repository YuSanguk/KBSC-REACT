import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { dbService } from "fbase";
import Nweet from "components/Tips";

const DisplayTips = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService.collection("tips").onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      {nweets.map(nweet => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default DisplayTips;
