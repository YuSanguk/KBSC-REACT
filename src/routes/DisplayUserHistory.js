import React from "react";

const UserHistory = ({ historyData }) => {
  console.log(historyData);
  return (
    <>
      <li>
        <p>{historyData.whatDid}</p>
        {historyData.createdDay && <p>{historyData.createdDay}</p>}
      </li>
    </>
  );
};

export default UserHistory;
