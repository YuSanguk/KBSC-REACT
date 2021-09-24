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

  const onBuy = () => {};

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
