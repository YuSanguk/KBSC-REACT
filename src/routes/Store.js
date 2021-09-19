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

  return (
    <>
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
