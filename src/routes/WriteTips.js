import React from "react";
import { useState } from "react/cjs/react.development";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const WriteTip = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState();
  const onSubmit = async event => {
    if (nweet === "") {
    } else {
      event.preventDefault();
      let attachmentUrl = "";
      if (attachment !== "") {
        const attachmentRef = storageService.ref().child(`tips/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
      }

      const nweetObj = {
        title: "title",
        text: nweet,
        createdAt: Date.now(), // Date.now뿐만 아니라 날짜와 시간도 만들어서 넣어야할듯
        //(아니면 Date.now를 기반으로 올린 시간과 날자를 찾는 함수를 만들어야함)
        // 새로운 데이터를 DB에 올리면 DB 공간이 낭비되므로 함수를 추가하여 연산하는 것이 이상적일것같음.
        creatorId: userObj.uid,
        attachmentUrl,
      };
      await dbService.collection("tips").add(nweetObj);
      setNweet("");
      setAttachment("");
      window.location.assign("");
    }
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onImageChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const OnClearPhoto = () => setAttachment(null);

  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What?"
        maxLength={120}
      />
      <input type="file" onChange={onImageChange} accept="image/*" />
      <input type="submit" value="Up" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={OnClearPhoto}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default WriteTip;
