import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "fbase";

const StoreModal = ({ userObj }) => {
  const value = window.location.href.split("?id=")[1];
  const [itemObj, setItemObj] = useState([]);
  useEffect(() => {
    dbService
      .collection("StoreItems")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const itemArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItemObj(itemArray);
      });
  }, []);

  let pos_ = 0;
  let worked = false;
  try {
    for (let i = 0; i < itemObj.length; i++) {
      if (itemObj[i].id === value) {
        worked = true;
        pos_ = i;
      }
    }
  } catch (e) {}

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    dbService.collection("users").onSnapshot(snapshot => {
      const userArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(userArray);
    });
  }, []);

  let userDb;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id === userObj.uid) {
      userDb = userData[i];
      break;
    }
  }

  const onBuy = async () => {
    if (userDb.point >= itemObj[pos_].price) {
      if (itemObj[pos_].creatorId === userObj.uid) {
        alert("자신의 상품은 구매할 수 없습니다.");
        window.location.assign("");
      } else {
        alert(
          "테스트기간입니다. 상품은 배송되지 않습니다. (유저 포인트 및 해당 상품은 사라집니다)"
        );
        await dbService.doc(`users/${userObj.uid}`).update({
          point: userDb.point - itemObj[pos_].price,
        });
        window.location.assign("");
      }
    } else {
      alert("포인트가 부족합니다.");
      window.location.assign("");
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/store">Go Back</Link>
          </li>
        </ul>
      </nav>
      <div>
        {worked && (
          <>
            <h4>{itemObj[pos_].title}</h4>
            <p>{itemObj[pos_].text}</p>
            {itemObj[pos_].attachmentUrl !== "" && (
              <img alt="StoreModal" src={itemObj[pos_].attachmentUrl}></img>
            )}
            <p>{itemObj[pos_].price + " point"}</p>
            <button onClick={onBuy}>BUY</button>
          </>
        )}
      </div>
    </>
  );
};

export default StoreModal;
