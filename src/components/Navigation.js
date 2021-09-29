import React from "react";
import { Link } from "react-router-dom";
import "../css/navigation-style.css";

const Navigation = () => (
  <nav>
    <ul className="nav-nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/mission">Mission</Link>
      </li>
      <li>
        <Link to="/store">Store</Link>
      </li>
      <li>
        <Link to="/community">Community </Link>
      </li>
      <li>
        <Link to="/profile">History</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
