import React from "react";
import { dbService } from "fbase";
import { Link } from "react-router-dom";

const Home = ({ userObj }) => {
  const create_code = () => {
    let list = [];
    let value = 0;
    while (list.length < 7) {
      value = Math.round(Math.random() * 33 + 1);
      if (list.includes(value) === false) {
        list.push(value);
      }
    }
    list.sort(function (a, b) {
      return a - b;
    });
    return list;
  };

  // DB에 USERID를 검색하고, 없으면 문서 생성
  try {
    const usersRef = dbService.collection("users").doc(userObj.uid);

    usersRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        usersRef.onSnapshot(doc => {});
      } else {
        const missionList = create_code();
        usersRef.set({
          point: 0,
          clearMission: [],
          failedMission: [],
          checkMission: [],
          LimitAssignItem: 3, // 일주일에 등록 할 수 있는 상품 수
          missionList: missionList,
          recentlyEdit: Date.now(),
          createdAt: Date.now(),
          ReRoll: 2, // 미션 리롤 수
        }); // create the document
      }
    });
  } catch (e) {
    window.location.assign("");
  }

  return (
    <div>
      <Link to="/community">Linssk </Link>
      <div>Here is Home</div>
    </div>
  );
};
export default Home;
