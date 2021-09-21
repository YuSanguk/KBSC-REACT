import React, { useState, useEffect } from "react";

const DisplayMission = ({ missionCode, missions, userObj, userDb }) => {
  let process = "아직아무것도";
  // (userDb.checkMission)
  // userDb.clearMission

  // missionCode + 1의 이유 : Db의 미션코드에선 6으로 되어있더라도,
  //이 구간의 missionCodesms 5로 되어있으므로 +1을 하여 연산을 맞춰줌
  if (userDb.checkMission.includes(missionCode + 1)) {
    process = "검토중";
  } else if (userDb.clearMission.includes(missionCode + 1)) {
    process = "완료";
  }

  return (
    <>
      <div>
        <li>
          <p>{missions[missionCode]}</p>
          {process === "아직아무것도" ? (
            <>
              <button>a</button>
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
