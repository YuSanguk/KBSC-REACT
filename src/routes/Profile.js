import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import UserHistory from "./DisplayUserHistory";
import "../css/userHistory-style.css";
import back from "../sourceImg/subTab-background.svg";

const Profile = ({ userObj }) => {
  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    dbService
      .collection("userHistory")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const historyArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserHistory(historyArray);
      });
  }, []);

  return (
    <div className="UserHistory">
      <h2>UserHistory</h2>

      <ul>
        {userHistory.map(historyData => (
          <>
            {historyData.creatorId === userObj.uid && (
              <UserHistory key={historyData.id} historyData={historyData} />
            )}
          </>
        ))}
        <hr />
      </ul>
      <img src={back} />
    </div>
  );
};

export default Profile;
