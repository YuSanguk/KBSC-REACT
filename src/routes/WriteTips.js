import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import "../css/writeTip-style.css";

const WriteTip = ({ userObj }) => {
  const [tipTitle, setTipTitle] = useState("");
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const getDate = () => {
    const day = new Date();
    return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
  };

  const onSubmit = async event => {
    if (nweet === "" || tipTitle === "") {
      alert("제목과 내용을 모두 추가해주세요");
    } else {
      event.preventDefault();
      let attachmentUrl = "";
      if (attachment !== "") {
        const attachmentRef = storageService.ref().child(`tips/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
      }

      const today = getDate();
      const nweetObj = {
        title: tipTitle,
        text: nweet,
        createdAt: Date.now(), // Date.now뿐만 아니라 날짜와 시간도 만들어서 넣어야할듯
        //(아니면 Date.now를 기반으로 올린 시간과 날자를 찾는 함수를 만들어야함)
        // 새로운 데이터를 DB에 올리면 DB 공간이 낭비되므로 함수를 추가하여 연산하는 것이 이상적일것같음.
        creatorId: userObj.uid,
        attachmentUrl,
        createdDate: today,
      };
      await dbService.collection("tips").add(nweetObj);
      await dbService.collection("userHistory").add({
        creatorId: userObj.uid,
        createdAt: Date.now(),
        whatDid: "글 작성",
        createdDay: today,
      });
      setNweet("");
      setAttachment("");
      window.location.assign("#/community");
    }
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onChangeTitle = event => {
    const {
      target: { value },
    } = event;
    setTipTitle(value);
  };

  const onImageChange = event => {
    const {
      target: { files },
    } = event;
    try {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = finishedEvent => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    } catch (e) {
      setAttachment("");
    }
  };

  const OnClearPhoto = () => {
    setAttachment("");
    document.querySelector(".image-input").value = "";
  };

  return (
    <div className="writeTip-container">
      <h2>글 작성</h2>
      <div className="writeTip-in">
        <div className="writeTip-inner">
          <p>제목</p>
          <p>내용</p>
          <p>사진 등록</p>
          <p>-</p>
        </div>
        <form onSubmit={onSubmit} className="writeTip-form">
          <input
            value={tipTitle}
            onChange={onChangeTitle}
            type="text"
            placeholder="Title"
            maxLength={30}
          />
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What?"
            maxLength={120}
          />
          <input
            type="file"
            className="image-input"
            onChange={onImageChange}
            accept="image/*"
          />
          <input type="submit" value="Up" />
        </form>
      </div>

      {attachment && (
        <div className="writeTip-img-container">
          <p>사진 미리보기</p>
          <div>
            <img src={attachment} alt="write" width="400px" height="200px" />
            <button onClick={OnClearPhoto}>이미지 제거</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteTip;
