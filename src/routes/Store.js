import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { dbService } from "fbase";
import { Link } from "react-router-dom";
import Items from "components/StoreItems";

const Store = ({ userObj }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    dbService.collection("StoreItems").onSnapshot(snapshot => {
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
    <>
      <p>상품등록권 : {userDb.LimitAssignItem} / 3 </p>
      <Link to="/store/item">Assign</Link>
      <div>
        <button onClick={toggleDisplay}>
          {displayMode ? "내 상품" : "모든 상품"}
        </button>
        <button onClick={toggleViewBuy}>
          {viewBuy ? "구매 가능" : "모든 상품"}
        </button>
        <ul>
          {items.map(item => (
            <>
              {displayMode ? (
                <>
                  {item.creatorId === userObj.uid && (
                    <Items key={item.id} itemObj={item} />
                  )}
                </>
              ) : (
                <>
                  {viewBuy ? (
                    <>
                      {userDb.point >= item.price &&
                        userDb.creatorId !== userObj.uid && (
                          <Items key={item.id} itemObj={item} />
                        )}
                    </>
                  ) : (
                    <>
                      <Items key={item.id} itemObj={item} />
                    </>
                  )}
                </>
              )}
            </>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Store;
