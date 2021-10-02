import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dbService, storageService } from "fbase";
import "../css/modal-style.css";

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

  const getDate = () => {
    const day = new Date();
    return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
  };

  const OnDeleateClcik = async () => {
    const ok = window.confirm("해당 글을 삭제하시겠습니까??");
    if (ok) {
      const today = getDate();
      await dbService.doc(`tips/${nweets[pos].id}`).delete();
      if (nweets[pos].attachmentUrl !== "") {
        await storageService.refFromURL(nweets[pos].attachmentUrl).delete();
      }
      await dbService.collection("userHistory").add({
        creatorId: userObj.uid,
        createdAt: Date.now(),
        createdDay: today,
        whatDid: "글 삭제",
      });
      window.location.assign("");
    }
  };

  return (
    <>
      <nav>
        <ul className="modal-ul">
          <li>
            <Link to="/community">Go Back</Link>
          </li>
        </ul>
      </nav>
      {work && nweets[pos].creatorId === userObj.uid && (
        <button className="modal-delete" onClick={OnDeleateClcik}>
          글 삭제
        </button>
      )}
      <div className="modal-container">
        {work && (
          <>
            <h4>{nweets[pos].title}</h4>
            <p>{nweets[pos].text}</p>
            {nweets[pos].attachmentUrl !== "" && (
              <img
                alt="modal"
                src={nweets[pos].attachmentUrl}
                height="300px"
                width="600px"
              ></img>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Modal;
