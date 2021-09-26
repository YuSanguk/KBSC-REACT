import React, { useState, useEffect } from "react";
import { dbService, authService } from "fbase";
import { Link } from "react-router-dom";
import "../css/home-style.css";
import { FaRegBell } from "react-icons/fa";
import { BiCommentError, BiStoreAlt, BiLogOut, BiUser } from "react-icons/bi";

const Home = ({ userObj }) => {
  const onLogOutClick = () => {
    const ans = window.confirm("로그아웃 하시겠습니까?");
    if (ans) authService.signOut();
  };

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

  let point = 0;
  const nickName = userObj.displayName;
  const [userData, SetUserData] = useState([]);

  useEffect(() => {
    dbService.collection("users").onSnapshot(snapshot => {
      const userArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      SetUserData(userArray);
    });
  }, []);

  try {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id === userObj.uid) {
        point = userData[i].point;
      }
    }
  } catch (e) {}

  return (
    <>
      <div className="home-Logo">
        <p>지구자구</p>
        <p>ZIGUZAGU</p>
      </div>
      <div className="home">
        <nav>
          <ul className="home-nav">
            <li className="home-first">
              <img src={userObj.photoURL} alt="hi" />
              <p>{nickName + " 님의 포인트"}</p>
              <p>{point + " Point"}</p>
            </li>
            <li onClick={onLogOutClick}>
              <BiLogOut />
              <p>LogOut</p>
            </li>
            <li>
              <Link to="/mission">
                <FaRegBell />
                <p>mission</p>
              </Link>
            </li>
            <li>
              <Link to="/community">
                <BiCommentError />
                <p>Community</p>
              </Link>
            </li>
            <li>
              <Link to="/store">
                <BiStoreAlt />
                <p>Store</p>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <BiUser />
                <p>History</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Home;
