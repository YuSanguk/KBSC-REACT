import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import "../css/mission-verify-style.css";

const AssignVerify = ({ userObj }) => {
  const MissionCode = window.location.href.split("?id=")[1];
  let head = "";
  let Missions = useState("");
  const [item, SetItem] = useState([]);

  useEffect(() => {
    dbService.collection("MissionList").onSnapshot(snapshot => {
      const itemArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      SetItem(itemArray);
    });
  }, []);
  try {
    Missions = item[0].mission;
    head = Missions[MissionCode];
  } catch (e) {}
  // 나중에 url 가지고 본인에게 없는 미션에 들어올 수도 있으니까 그 점은 유의해서 해결해야함
  // 고치기 귀찮으면 나중에 수정할 예정이라는 점을 어필

  // 유저 데이터 가지고 오기
  const [checkList, SetCheckList] = useState("");
  let MyData;

  try {
    useEffect(() => {
      dbService.collection("users").onSnapshot(snapshot => {
        const List = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        SetCheckList(List);
      });
    }, []);
    for (let i = 0; i < checkList.length; i++) {
      if (checkList[i].id === userObj.uid) {
        MyData = checkList[i].checkMission;
        if (MyData.includes(Number(MissionCode) + 1) === false)
          MyData.push(Number(MissionCode) + 1);
        break;
      }
    }
  } catch (e) {}

  // 글 업로드 및 checkMission 수정
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

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
    document.querySelector(".image_input").value = "";
  };

  const getDate = () => {
    const day = new Date();
    return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
  };

  const onSubmit = async event => {
    if (nweet === "" || attachment === "") {
      alert("미션 결과와 사진을 모두 추가해주세요");
    } else {
      event.preventDefault();
      let attachmentUrl = "";
      if (attachment !== "") {
        const attachmentRef = storageService.ref().child(`tips/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
        const today = getDate();
        await dbService.collection("userHistory").add({
          creatorId: userObj.uid,
          createdAt: Date.now(),
          whatDid: "미션 인증 신청",
          createdDay: today,
        });
      }

      const nweetObj = {
        people: 0,
        sum: 0,
        text: nweet,
        createdAt: Date.now(), // Date.now뿐만 아니라 날짜와 시간도 만들어서 넣어야할듯
        //(아니면 Date.now를 기반으로 올린 시간과 날자를 찾는 함수를 만들어야함)
        // 새로운 데이터를 DB에 올리면 DB 공간이 낭비되므로 함수를 추가하여 연산하는 것이 이상적일것같음.
        creatorId: userObj.uid,
        missionCode: MissionCode,
        attachmentUrl,
        who: [],
      };
      await dbService.collection("Checking").add(nweetObj);
      await dbService.doc(`users/${userObj.uid}`).update({
        checkMission: MyData,
      });
      setNweet("");
      setAttachment("");
      window.location.assign("#/mission");
    }
  };

  return (
    <>
      <div className="mission-verify-container">
        <h2>{"미션 : " + head}</h2>
        <div className="mission-verify-inner">
          <div>
            <p>미션 결과</p>
            <p>사진등록</p>
            <p>-</p>
          </div>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Input Text" />
            <input
              type="file"
              className="image_input"
              onChange={onImageChange}
              accept="image/*"
            />
            <input type="submit" value="인증 신청" />
          </form>
        </div>
        {attachment && (
          <div className="mission-verify-img-container">
            <p>사진 미리보기</p>
            <div>
              <img src={attachment} alt="write" width="400px" height="200px" />
              <button onClick={OnClearPhoto}>이미지 제거</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AssignVerify;
