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

  return (
    <>
      <p>상품등록권 : {userDb.LimitAssignItem} / 3 </p>
      <Link to="/store/item">Assign</Link>
      <div>
        <ul>
          {items.map(item => (
            <Items key={item.id} itemObj={item} />
          ))}
        </ul>
      </div>
    </>
  );
};
export default Store;
