import React from "react";
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

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
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
            <Route exact path="/mission/veirfy">
              <AssignVerify />
            </Route>
            <Route path="/modal">
              <Modal />
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
      </Switch>
    </Router>
  );
};

export default AppRouter;
