import React from "react";
import { dbService } from "fbase";
import { useState, useEffect } from "react/cjs/react.development";
import DisplayMission from "components/DisplayMissions";
import CheckingMission from "components/DisplayCheckingMissions";

const Mission = ({ userObj }) => {
  let UserMissionList = useState(""); // 유저 별 미션 코드 번호
  let Missions = useState(""); // 전체 미션 목록
  let MissionList = []; // 유저가 해야하는 미션
  let userCode = [];
  let userDb = [];
  const [userDetail, SetUserDetail] = useState([]);
  const [item, SetItem] = useState([]);
  useEffect(() => {
    dbService.collection("users").onSnapshot(snapshot => {
      const userArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      SetUserDetail(userArray);
    });
  }, []);
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
    // 유저에 맞는 QuestList 가져오기
    for (let i = 0; i < userDetail.length; i++) {
      if (userDetail[i].id === userObj.uid) {
        UserMissionList = userDetail[i].missionList;
        userDb = userDetail[i];
      }
    }

    for (let i of UserMissionList) {
      MissionList.push(Missions[i - 1]);
      userCode.push(i - 1);
    }
  } catch (e) {}
  //  console.log(MissionList);

  const [CheckingData, setCheckingData] = useState("");
  let DisplayData = [];
  useEffect(() => {
    dbService
      .collection("Checking")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const dataArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCheckingData(dataArray);
      });
  }, []);

  try {
    for (let i = 0; i < CheckingData.length; i++) {
      if (
        CheckingData[i].creatorId !== userObj.uid &&
        CheckingData[i].who.includes(userObj.uid) === false
      ) {
        DisplayData.push(CheckingData[i]);
      }
    }
  } catch (e) {}

  return (
    <>
      <div>
        <p>Misson</p>
        <ul>
          {userCode.map(item => (
            <DisplayMission
              key={item}
              missionCode={item}
              missions={Missions}
              userDb={userDb}
            />
          ))}
        </ul>
        <p>Evaluating</p>
        <ul>
          {DisplayData.map(item => (
            <CheckingMission key={item.id} mission={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Mission;
