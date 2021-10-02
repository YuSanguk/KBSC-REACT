import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "fbase";
import "../css/storemodal-style.css";

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
        // 아이템 삭제를 할때, 이미지를 먼저 삭제하고, 데이터를 삭제한다
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
      <div className="storeModal-container">
        {worked && (
          <>
            <div className="storeModal-1">
              <p>{itemObj[pos_].title}</p>
              <hr />
              <img
                alt="StoreModal"
                width="800px"
                height="500px"
                src={itemObj[pos_].attachmentUrl}
              ></img>
            </div>
            <div className="storeModal-2">
              <div>
                <p>{itemObj[pos_].text}</p>
                <p>{itemObj[pos_].price + " point"}</p>
                <button onClick={onBuy}>BUY</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StoreModal;
