import React from "react";
import { Link } from "react-router-dom";
import { dbService } from "fbase";
import { useState, useEffect } from "react/cjs/react.development";

const EvalutePage = ({ userobj }) => {
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

  try {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].id === id) {
        data = datas[i];
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

  return (
    <>
      <Link to="/mission">back</Link>
      <div>{id}</div>
      <form>
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
