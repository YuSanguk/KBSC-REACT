import React from "react";
import { Link } from "react-router-dom";

const DisplayMission = ({ missionCode, missions, userDb }) => {
  let process = "아직아무것도";
  // (userDb.checkMission)
  // userDb.clearMission

  // missionCode + 1의 이유 : Db의 미션코드에선 6으로 되어있더라도,
  //이 구간의 missionCodesms 5로 되어있으므로 +1을 하여 연산을 맞춰줌
  if (userDb.checkMission.includes(missionCode + 1)) {
    process = "검토중";
  } else if (userDb.clearMission.includes(missionCode + 1)) {
    process = "완료";
  } else if (userDb.failedMission.includes(missionCode + 1)) {
    process = "실패";
  }

  const pos = "/verify?";

  return (
    <>
      <div>
        <li>
          <p>{missions[missionCode]}</p>
          {process === "아직아무것도" ? (
            <>
              <Link to={pos + "id=" + missionCode}>
                <p>인증하기</p>
              </Link>
            </>
          ) : (
            <p>{process}</p>
          )}
        </li>
      </div>
    </>
  );
};

export default DisplayMission;
