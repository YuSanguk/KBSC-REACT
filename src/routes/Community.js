import DisplayTips from "./DisplayTips";
import "../css/community-style.css";
import back from "../sourceImg/subTab-background.svg";

const Community = ({ userObj, isLoggedIn }) => {
  return (
    <div className="community-container">
      <h2>Community</h2>
      <DisplayTips userObj={userObj} isLoggedIn={isLoggedIn} />
      <img src={back} />
    </div>
  );
};

export default Community;
