import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

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

  const onSubmit = async event => {
    if (nweet === "") {
    } else {
      event.preventDefault();
      let attachmentUrl = "";
      if (attachment !== "") {
        const attachmentRef = storageService.ref().child(`tips/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
        await dbService.collection("userHistory").add({
          creatorId: userObj.uid,
          createdAt: Date.now(),
          whatDid: "미션 인증 신청",
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
      window.location.assign("");
    }
  };

  return (
    <>
      <p>{"미션 - " + head}</p>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="Input Text" />
        <input type="file" onChange={onImageChange} accept="image/*" />
        <input type="submit" value="인증 신청" />
      </form>
      {attachment && (
        <div>
          <img src={attachment} alt="write" width="50px" height="50px" />
          <button onClick={OnClearPhoto}>Clear</button>
        </div>
      )}
    </>
  );
};

export default AssignVerify;
