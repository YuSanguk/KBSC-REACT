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
import Randing from "../routes/Landing";
import Landing from "../routes/Landing";

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
              <Coummunity userObj={userObj} />
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
