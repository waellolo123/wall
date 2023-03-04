import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogoutAction } from "../../redux/actions/authActions";
import { Search } from "../../redux/actions/imagesActions";
import Social from "../social/Social";
import Downloads from "../../components/downloads/Downloads";
import "./navbar.css";

const Navbar = () => {
  const { isConnected, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onSearch = (e) => {
    dispatch(Search(e.target.value));
  };
  return (
    <div className="navbar">
      <div className="nav-container">
        <h2 className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            WallTribute
          </Link>
        </h2>
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
        <div className="btnAndSearch">
        <input
          type="text"
          placeholder="Search"
          className="nav-input"
          onKeyUp={onSearch}
        />
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
    </div>
  );
};

export default Navbar;
