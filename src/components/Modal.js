import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import { dbService } from "fbase";

const Modal = () => {
  const value = window.location.href.split("?id=")[1];
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

  let pos = -1;
  let work = false;
  for (let i = 0; i < nweets.length; i++) {
    if (nweets[i].id === value) {
      pos = i;
      work = true;
    }
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/community">Go Back</Link>
          </li>
        </ul>
      </nav>
      <div>
        {work && (
          <>
            <h4>{nweets[pos].title}</h4>
            <p>{nweets[pos].text}</p>
            {nweets[pos].attachmentUrl !== "" && (
              <img src={nweets[pos].attachmentUrl}></img>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Modal;
