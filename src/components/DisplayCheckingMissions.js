import React from "react";
import { Link } from "react-router-dom";

const CheckingMission = ({ mission }) => {
  const pos = "/evalute?id=" + mission.id;
  return (
    <>
      <li>
        <Link to={pos}>미션 평가하기</Link>
      </li>
    </>
  );
};

export default CheckingMission;
