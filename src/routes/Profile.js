import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import UserHistory from "./DisplayUserHistory";

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
    <>
      <p>UserHistory</p>
      {userHistory.map(historyData => (
        <>
          <ul>
            {historyData.creatorId === userObj.uid && (
              <UserHistory key={historyData.id} historyData={historyData} />
            )}
          </ul>
        </>
      ))}
    </>
  );
};

export default Profile;
