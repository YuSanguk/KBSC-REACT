import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import "../css/assign-item-style.css";

const AssignItem = ({ userObj }) => {
  const [itemTitle, setItemTitle] = useState("");
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [work, setWork] = useState(false);

  let userDb = [];
  const [userDetail, SetUserDetail] = useState([]);

  useEffect(() => {
    dbService.collection("users").onSnapshot(snapshot => {
      const userArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      SetUserDetail(userArray);
    });
  }, []);

  try {
    for (let i = 0; i < userDetail.length; i++) {
      if (userDetail[i].id === userObj.uid) {
        userDb = userDetail[i];
        break;
      }
    }
  } catch (e) {}
  if (userDb.LimitAssignItem <= 0) {
    alert("상품 등록권이 없습니다!");
    window.location.assign("");
  }

  const getDate = () => {
    const day = new Date();
    return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
  };

  const onSubmit = async event => {
    if (nweet === "" || itemTitle === "" || attachment === "" || num === "") {
      event.preventDefault();
      alert(
        "제목, 내용글, 이미지 추가, 가격 설정을 모두 마쳤는지 확인해주세요"
      );
    } else if (isNaN(num) === true) {
      event.preventDefault();
      alert("가격을 정수로 입력해주세요");
    } else if (work === false) {
      event.preventDefault();
      let attachmentUrl = "";
      if (attachment !== "") {
        const attachmentRef = storageService.ref().child(`tips/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
      }

      const nweetObj = {
        title: itemTitle,
        text: nweet,
        createdAt: Date.now(), // Date.now뿐만 아니라 날짜와 시간도 만들어서 넣어야할듯
        //(아니면 Date.now를 기반으로 올린 시간과 날자를 찾는 함수를 만들어야함)
        // 새로운 데이터를 DB에 올리면 DB 공간이 낭비되므로 함수를 추가하여 연산하는 것이 이상적일것같음.
        creatorId: userObj.uid,
        attachmentUrl,
        price: num,
      };

      const today = getDate();
      await dbService.collection("StoreItems").add(nweetObj);
      await dbService.collection("userHistory").add({
        creatorId: userObj.uid,
        createdAt: Date.now(),
        whatDid: "상품 등록",
        createdDay: today,
      });

      const LimitAssignItemValue = Number(userDb.LimitAssignItem) - 1;
      await dbService.doc(`users/${userObj.uid}`).update({
        LimitAssignItem: LimitAssignItemValue,
      });
      setNweet("");
      setAttachment("");
      setWork(true);
      window.location.assign("#/store");
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
    setItemTitle(value);
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

  const CheckNumber = event => {
    if (event.key >= 0 && event.key <= 9) {
      return true;
    } else {
      return false;
    }
  };

  const [num, setNum] = useState("");
  const CheckSize = event => {
    const {
      target: { value },
    } = event;
    try {
      setNum(Number(value));
    } catch (e) {
      alert("숫자만 입력해주세요");
      setNum();
    }
  };

  return (
    <div className="assign-item-container">
      <h2>상품 등록</h2>
      <div className="assign-item-in">
        <div className="assign-item-inner">
          <p>상품명</p>
          <p>상품 설명</p>
          <p>상품 가격</p>
          <p>이미지 등록</p>
          <p>.</p>
        </div>
        <form onSubmit={onSubmit}>
          <input
            value={itemTitle}
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
            type="text"
            value={num}
            onKeyDown={CheckNumber}
            onChange={CheckSize}
            placeholder="Point 가격"
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
        <div className="assign-item-img">
          <p>사진 미리보기</p>
          <div>
            <img src={attachment} alt="write" width="400px" height="200px" />
            <button onClick={OnClearPhoto}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignItem;
