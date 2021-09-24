import React from "react";
import { Link } from "react-router-dom";

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
      <div>container 2</div>
      <div>containr3</div>
    </>
  );
};

export default Landing;
