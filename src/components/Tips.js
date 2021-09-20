import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const OnDeleateClcik = async () => {
    const ok = window.confirm("Are you Sure to delete tips?");
    if (ok) {
      await dbService.doc(`tips/${nweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => {
    setEditing(prev => !prev);
  };
  const onSubmit = async event => {
    event.preventDefault();
    await dbService.doc(`tips/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChange}
              placeholder="Edit"
              value={newNweet}
              required
            />
            <input type="submit" value="Update Your Tips" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          <img src={nweetObj.attachmentUrl} width="50px" height="50px"></img>
          {isOwner && (
            <>
              <button onClick={OnDeleateClcik}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
