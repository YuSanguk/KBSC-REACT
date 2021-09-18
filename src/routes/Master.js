import React from "react";
import { dbService } from "fbase";
import { useState } from "react/cjs/react.development";

const Master = ({ userObj }) => {
  const check = () => {
    if (userObj.uid === "rPG81P80MydSfqia3UsTJv2zqSZ2") {
    } else {
      window.location.assign("");
    }
  };
  check();

  const [text, setText] = useState("");

  const onSubmit = async event => {
    event.preventDefault();
    let array = text.split(",");
    await dbService.collection("MissionList").doc("a").set({
      mission: array,
    });
    setText("");
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={text}
            onChange={onChange}
            placeholder="미션 입력, ','로 구분"
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    </>
  );
};

export default Master;
