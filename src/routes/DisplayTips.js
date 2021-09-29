import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Tips";
import { Link } from "react-router-dom";
import "../css/community-style.css";

const DisplayTips = ({ userObj }) => {
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
      <div className="community-head">
        <Link to="/community/write">Write</Link>
        <button onClick={toggleDisplay}>
          {displayMode ? "내 글" : "모든 글"}
        </button>
      </div>
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
        <hr />
      </ul>
    </>
  );
};

export default DisplayTips;
