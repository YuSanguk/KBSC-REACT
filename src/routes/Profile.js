import { authService, dbService } from "fbase";
import React, { useState, useEffect } from "react";
import UserHistory from "./DisplayUserHistory";

const Profile = ({ userObj }) => {
  const onLogOutClick = () => {
    authService.signOut();
  };

  let point = 0;
  const [userData, SetUserData] = useState([]);

  useEffect(() => {
    dbService.collection("users").onSnapshot(snapshot => {
      const userArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      SetUserData(userArray);
    });
  }, []);

  try {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id === userObj.uid) {
        point = userData[i].point;
      }
    }
  } catch (e) {}

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
      <p>{point + " Point"}</p>
      <button onClick={onLogOutClick}>Log out</button>
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
