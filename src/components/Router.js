import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import Store from "../routes/Store";
import Mission from "../routes/Mission";
import Coummunity from "../routes/Community";
import Landing from "../routes/Landing";
import WriteTip from "routes/WriteTips";
import AssignItem from "routes/AssignItem";
import Master from "routes/Master";
import AssignVerify from "routes/AssignVerify";
import Modal from "./Modal";
import StoreModal from "./StoreModal";
import EvalutePage from "routes/EvaluteMission";

const AppRouter = ({ isLoggedIn, userObj }) => {
  const [page, setPage] = useState(false);
  const keyWords = [
    "profile",
    "store",
    "mission",
    "community",
    "master",
    "verify",
    "modal",
    "storeitem",
    "evalute",
    "write",
  ];

  window.onhashchange = function async() {
    const pos = window.location.href;
    let v = 0;
    for (let i = 0; i < keyWords.length; i++) {
      if (pos.indexOf(keyWords[i]) !== -1) {
        v += 1;
        break;
      }
    }
    if (v > 0) {
      setPage(true);
    } else {
      setPage(false);
    }
  };

  return (
    <Router>
      {isLoggedIn && (
        <>
          {page ? (
            <>
              <Navigation />
            </>
          ) : (
            <></>
          )}
        </>
      )}
      <Switch>
        <>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} />
              </Route>
              <Route exact path="/store">
                <Store userObj={userObj} />
              </Route>
              <Route exact path="/mission">
                <Mission userObj={userObj} />
              </Route>
              <Route exact path="/community">
                <Coummunity userObj={userObj} isLoggedIn={isLoggedIn} />
              </Route>
              <Route exact path="/community/write">
                <WriteTip userObj={userObj} />
              </Route>
              <Route exact path="/store/item">
                <AssignItem userObj={userObj} />
              </Route>
              <Route exact path="/master">
                <Master userObj={userObj} />
              </Route>
              <Route path="/verify">
                <AssignVerify userObj={userObj} />
              </Route>
              <Route path="/modal">
                <Modal userObj={userObj} />
              </Route>
              <Route path="/storeitem">
                <StoreModal userObj={userObj} />
              </Route>
              <Route path="/evalute">
                <EvalutePage userObj={userObj} />
              </Route>
              <Redirect from="*" to="/" />
            </>
          ) : (
            <>
              <Route exact path="/">
                <Landing />
              </Route>
              <Redirect from="*" to="/" />
              <Route exact path="/auth">
                <Auth />
              </Route>
            </>
          )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
