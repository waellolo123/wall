import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Social from "../social/Social";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../redux/actions/authActions";

const Navbar = () => {
  const { isConnected, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="nav-container">
        <h2 className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Wall Tribute
          </Link>
        </h2>
        <Social />
        <ul className="nav-list">
          {!isConnected && (
            <li className="nav-link">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            </li>
          )}
          {isConnected && user?.roles?.indexOf("1") !== -1 && (
            <li className="nav-link">
              <Link
                to="/admin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Admin
              </Link>
            </li>
          )}
        </ul>
        <input type="text" placeholder="Search" className="nav-input" />
        <button className="nav-btn">
          <Link
            to="/structure"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Upload your image
          </Link>
        </button>
        {isConnected && (
          <button
            className="nav-btn"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => dispatch(LogoutAction())}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
