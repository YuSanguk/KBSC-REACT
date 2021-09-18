import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { dbService } from "fbase";
import Nweet from "components/Tips";

const Home = ({ userObj }) => {
  const create_code = () => {
    let list = [];
    let value = 0;
    while (list.length < 7) {
      value = Math.round(Math.random() * 30 + 1);
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
  const usersRef = dbService.collection("users").doc(userObj.uid);

  usersRef.get().then(docSnapshot => {
    if (docSnapshot.exists) {
      usersRef.onSnapshot(doc => {});
    } else {
      const missionList = create_code();
      usersRef.set({
        point: 0,
        clearMission: [],
        missionList: missionList,
      }); // create the document
    }
  });

  return (
    <div>
      <div>Here is Home</div>
    </div>
  );
};
export default Home;
