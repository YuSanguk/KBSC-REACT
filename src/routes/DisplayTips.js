import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { dbService } from "fbase";
import Nweet from "components/Tips";
import Modal from "components/Modal";

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

  let modalMode = true;
  const [modalObj, SetModalObj] = useState([]);
  const ToggleModal = item => {
    let d = {};
    for (let i in item) {
      d[i] = item[i];
    }
    modalMode = !modalMode;
    if (d.id === modalObj.id && modalObj.title === null) {
    } else if (d.id === modalObj.id) {
      d.title = null;
      d.text = null;
      d.attachmentUrl = null;
    }
    SetModalObj(d);
  };

  return (
    <>
      {modalMode ? <Modal itemObj={modalObj} /> : <> </>}
      <div>
        <ul>
          {nweets.map(nweet => (
            <li
              onClick={() => {
                ToggleModal(nweet);
                // console.log(nweet);
              }}
              key={nweet.id}
            >
              <Nweet
                key={nweet.id}
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DisplayTips;
