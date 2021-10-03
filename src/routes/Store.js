import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { Link } from "react-router-dom";
import Items from "components/StoreItems";
import "../css/store-style.css";
import back from "../sourceImg/subTab-background.svg";

const Store = ({ userObj }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    dbService
      .collection("StoreItems")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const itemArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemArray);
      });
  }, []);

  let userDb = [];
  const [userDetail, SetUserDetail] = useState([]);

  useEffect(() => {
    dbService.collection("users").onSnapshot(snapshot => {
      const userArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      SetUserDetail(userArray);
    });
  }, []);

  try {
    for (let i = 0; i < userDetail.length; i++) {
      if (userDetail[i].id === userObj.uid) {
        userDb = userDetail[i];
        break;
      }
    }
  } catch (e) {}

  const [displayMode, setDisplayMode] = useState(false);
  const toggleDisplay = () => {
    setDisplayMode(prev => !prev);
    if (viewBuy === true) setViewBuy(prev => !prev);
  };

  const [viewBuy, setViewBuy] = useState(false);
  const toggleViewBuy = () => {
    setViewBuy(prev => !prev);
    if (displayMode === true) setDisplayMode(prev => !prev);
  };

  return (
    <div className="store">
      <h2>STORE</h2>
      <p>상품등록권 : {userDb.LimitAssignItem} / 3 </p>
      <div className="store-head">
        <Link to="/store/item">상품등록하러 가기</Link>
        <div>
          <button onClick={toggleDisplay}>
            {displayMode ? "내 상품" : "모든 상품"}
          </button>
          <button onClick={toggleViewBuy}>
            {viewBuy ? "구매 가능" : "모든 상품"}
          </button>
        </div>
      </div>
      <ul>
        {items.map(item => (
          <>
            {((viewBuy === false && displayMode === false) ||
              (displayMode && item.creatorId === userObj.uid) ||
              (displayMode === false &&
                viewBuy &&
                item.price < userDb.point &&
                item.creatorId !== userObj.uid)) && (
              <>
                <Items key={item.id + "2"} itemObj={item} />
              </>
            )}
          </>
        ))}
        <hr />
      </ul>
      <img src={back} />
    </div>
  );
};
export default Store;
