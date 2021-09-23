import React from "react";
import { Link } from "react-router-dom";

const CheckingMission = ({ mission }) => {
  const pos = "/evalute" + "?id=" + mission.id;
  return (
    <>
      <li>
        <Link to={pos}>{mission.missionCode}</Link>
      </li>
    </>
  );
};

export default CheckingMission;
