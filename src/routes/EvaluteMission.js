import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dbService } from "fbase";

const EvalutePage = ({ userObj }) => {
  const id = window.location.href.split("?id=")[1];
  let data;
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    dbService.collection("Checking").onSnapshot(snapshot => {
      const DataArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDatas(DataArray);
    });
  }, []);

  let Missions = useState("");
  let user_mission;
  const [item, SetItem] = useState([]);

  useEffect(() => {
    dbService.collection("MissionList").onSnapshot(snapshot => {
      const itemArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      SetItem(itemArray);
    });
  });

  let worked = false;

  try {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].id === id) {
        data = datas[i];
        Missions = item[0].mission;
        user_mission = Missions[data.missionCode];
        worked = true;
        break;
      }
    }
  } catch (e) {}

  const CheckNumber = event => {
    if (event.key >= 0 && event.key <= 9) {
      return true;
    } else {
      return false;
    }
  };

  const [num, setNum] = useState("");
  const CheckSize = event => {
    let {
      target: { value },
    } = event;
    if (num > 10) {
      value = 9;
      alert("10보다 작은 수로 입력해주세요");
    }
    setNum(value);
  };

  const onSubmit = async event => {
    if (num !== "" && num >= 0 && num < 10) {
      event.preventDefault();
      const people = Number(data.people) + Number(1);
      const sum = Number(data.sum) + Number(num);
      let who = data.who;
      who.push(userObj.uid);
      await dbService.doc(`Checking/${data.id}`).update({
        people: people,
        sum: sum,
        who: who,
      });
      await dbService.collection("userHistory").add({
        creatorId: userObj.uid,
        createdAt: Date.now(),
        whatDid: "미션 평가",
      });
      setNum(0);
      window.location.assign("");
    } else {
      setNum(0);
      alert("숫자를 입력해주세요");
    }
  };

  return (
    <>
      <Link to="/mission">back</Link>
      {worked && (
        <>
          <div>{user_mission}</div>
          <div>{data.text}</div>
        </>
      )}

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={num}
          onKeyDown={CheckNumber}
          onChange={CheckSize}
          maxLength={1}
          placeholder="0~9 사이로 입력해주세요"
        />
        <input type="submit" value="Up" />
      </form>
    </>
  );
};

export default EvalutePage;
