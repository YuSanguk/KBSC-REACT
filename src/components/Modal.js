import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dbService, storageService } from "fbase";

const Modal = ({ userObj }) => {
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

  const OnDeleateClcik = async () => {
    const ok = window.confirm("Are you Sure to delete tips?");
    if (ok) {
      await dbService.doc(`tips/${nweets[pos].id}`).delete();
      if (nweets[pos].attachmentUrl !== "") {
        await storageService.refFromURL(nweets[pos].attachmentUrl).delete();
      }
      window.location.assign("");
    }
  };

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
            {nweets[pos].creatorId === userObj.uid && (
              <button onClick={OnDeleateClcik}>Delete</button>
            )}
            <h4>{nweets[pos].title}</h4>
            <p>{nweets[pos].text}</p>
            {nweets[pos].attachmentUrl !== "" && (
              <img
                alt="modal"
                src={nweets[pos].attachmentUrl}
                height="70px"
                width="70px"
              ></img>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Modal;
