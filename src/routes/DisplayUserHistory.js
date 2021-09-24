import React from "react";

const UserHistory = ({ historyData }) => {
  return (
    <>
      <li>
        <p>{historyData.whatDid}</p>
        <p>{historyData.createdAt}</p>
      </li>
    </>
  );
};

export default UserHistory;
