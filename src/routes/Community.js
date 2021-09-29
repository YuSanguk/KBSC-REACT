import DisplayTips from "./DisplayTips";
import "../css/community-style.css";

const Community = ({ userObj, isLoggedIn }) => {
  return (
    <div className="community-container">
      <h2>Community</h2>
      <DisplayTips userObj={userObj} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Community;
