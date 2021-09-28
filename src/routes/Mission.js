import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import DisplayMission from "components/DisplayMissions";
import CheckingMission from "components/DisplayCheckingMissions";
import "../css/mission-style.css";

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

  const [onEval, setOnEval] = useState(false);
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
        if (onEval === false) setOnEval(true);
      } else if (CheckingData[i].creatorId === userObj.uid) {
        const people = CheckingData[i].people;
        const sum = CheckingData[i].sum;

        if (userDb.recentlyEdit + 1500 <= Date.now()) {
          if (14 <= sum && people >= 3) {
            // 성공
            const success = async () => {
              const Code = Number(CheckingData[i].missionCode) + 1;
              let clearArray = userDb.clearMission;
              let checkMission = userDb.checkMission;
              if (clearArray.includes(Code) === false) clearArray.push(Code);
              for (let j = 0; j < checkMission.length; j++) {
                if (checkMission[j] === Code) {
                  checkMission.splice(j, 1);
                  j--;
                }
              }

              try {
                let point = Number(userDb.point);
                await dbService.doc(`users/${userObj.uid}`).update({
                  checkMission: checkMission,
                  clearMission: clearArray,
                  point: point + 50,
                  recentlyEdit: Date.now(),
                });

                await storageService
                  .refFromURL(CheckingData[i].attachmentUrl)
                  .delete();
                await dbService.doc(`Checking/${CheckingData[i].id}`).delete();
              } catch (e) {}
            };
            success();
          } else if (14 > sum && people >= 3) {
            // 실패
            const failed = async () => {
              const Code = Number(CheckingData[i].missionCode) + 1;
              let failedArray = userDb.failedMission;
              let checkMission = userDb.checkMission;
              if (failedArray.includes(Code) === false) failedArray.push(Code);
              for (let j = 0; j < checkMission.length; j++) {
                checkMission.splice(j, 1);
                j--;
              }

              try {
                await dbService.doc(`users/${userObj.uid}`).update({
                  checkMission: checkMission,
                  failedMission: failedArray,
                  recentlyEdit: Date.now(),
                });
                await storageService
                  .refFromURL(CheckingData[i].attachmentUrl)
                  .delete();
                await dbService.doc(`Checking/${CheckingData[i].id}`).delete();
              } catch (e) {}
            };
            failed();
          }
        }
      }
    }
  } catch (e) {}

  let ReRoll = Number(userDb.ReRoll);
  const reroll = async () => {
    if (ReRoll > 0) {
      const main_arr = userDb.missionList;
      const check_arr = userDb.checkMission;
      const clear_arr = userDb.clearMission;
      const failer_arr = userDb.failedMission;
      let main2_arr = [...check_arr, ...clear_arr, ...failer_arr];

      let list = [];
      let value = 0;
      while (list.length < main_arr.length - main2_arr.length) {
        value = Math.round(Math.random() * 33 + 1);
        if (
          list.includes(value) === false &&
          main2_arr.includes(value) === false
        ) {
          list.push(value);
        }
      }

      let main3_arr = [...list, ...main2_arr];
      main3_arr.sort(function (a, b) {
        return a - b;
      });

      await dbService.doc(`users/${userObj.uid}`).update({
        missionList: main3_arr,
        ReRoll: ReRoll - 1,
      });
      await dbService.collection("userHistory").add({
        creatorId: userObj.uid,
        createdAt: Date.now(),
        whatDid: "미션 변경",
      });
    } else {
      alert("리롤권이 없습니다");
    }
  };

  const [display, setDisplay] = useState(true);
  const toMission = () => {
    setDisplay(true);
  };

  const toEvalute = () => {
    setDisplay(false);
  };

  return (
    <>
      <div className="mission-Container">
        <div className="mission-Head">
          <p onClick={toMission} className={display ? "mission-select" : null}>
            Mission
          </p>
          <p onClick={toEvalute} className={display ? null : "mission-select"}>
            Evalute
          </p>
        </div>
        <div className="mission-body">
          {display ? (
            <>
              <div className="mission-middle-box">
                <p>Mission Re:Roll : {userDb.ReRoll} / 2</p>
                <button onClick={reroll}>ReRoll</button>
              </div>
              <ul>
                {userCode.map(item => (
                  <>
                    <DisplayMission
                      key={item}
                      missionCode={item}
                      missions={Missions}
                      userDb={userDb}
                    />
                  </>
                ))}
              </ul>
            </>
          ) : (
            <ul className="mission-eval">
              {onEval ? (
                <>
                  {DisplayData.map(item => (
                    <CheckingMission key={item.id} mission={item} />
                  ))}
                </>
              ) : (
                <li>
                  <p className="mission-no">"미션이 없습니다"</p>
                </li>
              )}
            </ul>
          )}
          <hr />
        </div>
      </div>
    </>
  );
};

export default Mission;
