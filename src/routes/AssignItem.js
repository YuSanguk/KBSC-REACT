import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

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
      await dbService.collection("StoreItems").add(nweetObj);
      await dbService.collection("userHistory").add({
        creatorId: userObj.uid,
        createdAt: Date.now(),
        whatDid: "상품 등록",
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

  const OnClearPhoto = () => setAttachment("");

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
      <input type="file" onChange={onImageChange} accept="image/*" />
      <input type="submit" value="Up" />
      {attachment && (
        <div>
          <img src={attachment} alt="write" width="50px" height="50px" />
          <button onClick={OnClearPhoto}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default AssignItem;
