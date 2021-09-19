import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { dbService } from "fbase";

const AssignItem = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async event => {
    if (nweet == "") {
    } else {
      event.preventDefault();
      await dbService.collection("StoreItems").add({
        img: "img_path",
        title: "title_test",
        text: nweet,
        createdAt: Date.now(), // Date.now뿐만 아니라 날짜와 시간도 만들어서 넣어야할듯
        //(아니면 Date.now를 기반으로 올린 시간과 날자를 찾는 함수를 만들어야함)
        // 새로운 데이터를 DB에 올리면 DB 공간이 낭비되므로 함수를 추가하여 연산하는 것이 이상적일것같음.
        creatorId: userObj.uid,
      });
      setNweet("");
      window.location.assign("");
    }
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What?"
        maxLength={120}
      />
      <input type="submit" value="Up" />
    </form>
  );
};

export default AssignItem;
