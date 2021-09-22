import { authService, dbService } from "fbase";
import React from "react";
import { useState, useEffect } from "react/cjs/react.development";

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

  return (
    <>
      <p>{point + " Point"}</p>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
