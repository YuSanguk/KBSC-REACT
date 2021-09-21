import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { dbService } from "fbase";
import Nweet from "components/Tips";
import { Link } from "react-router-dom";

const DisplayTips = ({ userObj, isLoggedIn }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("tips")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const nweetArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  let pos = "/modal?";

  return (
    <>
      <div>
        <ul>
          {nweets.map(nweet => (
            <li key={nweet.id}>
              <Link to={pos + "id=" + nweet.id}>
                <Nweet
                  key={nweet.id}
                  nweetObj={nweet}
                  isOwner={nweet.creatorId === userObj.uid}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DisplayTips;
