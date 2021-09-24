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

  const pos = "/modal?";

  const [displayMode, setDisplayMode] = useState(false);
  const toggleDisplay = async () => {
    setDisplayMode(prev => !prev);
  };

  return (
    <>
      <div>
        <button onClick={toggleDisplay}>
          {displayMode ? "내 글" : "모든 글"}
        </button>
        <ul>
          {nweets.map(nweet => (
            <>
              {displayMode ? (
                <>
                  {nweet.creatorId === userObj.uid && (
                    <li key={nweet.id}>
                      <Link to={pos + "id=" + nweet.id}>
                        <Nweet
                          key={nweet.id}
                          nweetObj={nweet}
                          isOwner={nweet.creatorId === userObj.uid}
                        />
                      </Link>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li key={nweet.id}>
                    <Link to={pos + "id=" + nweet.id}>
                      <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                      />
                    </Link>
                  </li>
                </>
              )}
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DisplayTips;
