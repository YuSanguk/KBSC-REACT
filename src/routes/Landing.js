import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import Auth from "./Auth";

const Landing = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/Auth">Login</Link>
          </li>
        </ul>
      </nav>
      <div>Landing</div>
    </>
  );
};

export default Landing;
