import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetGlobalImagesAction } from "../../redux/actions/imagesActions";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { getAll } = useSelector((state) => state.images);
  const left = getAll?.filter((i) => i.position === "left");
  const right = getAll?.filter((i) => i.position === "right");
  const Cleft = getAll?.filter((i) => i.position === "c-left");
  const Cright = getAll?.filter((i) => i.position === "c-right");
  const Bleft = getAll?.filter((i) => i.position === "b-left");
  const Bright = getAll?.filter((i) => i.position === "b-right");
  useEffect(() => {
    dispatch(GetGlobalImagesAction());
  }, []);
  return (
    <div className="home">
      <div className="home-container">
        <div className="image-container">
          <div className="up-left blocks">
            {left.map((i) => {
              return (
                <Link to="/image/:id">
                  <img
                    src={`http://localhost:3400${i.image}`}
                    alt=""
                    className="home-image"
                  />
                </Link>
              );
            })}
          </div>
          <div className="up-right blocks">
            {right.map((i) => {
              return (
                <Link to="/image/:id">
                  <img
                    src={`http://localhost:3400${i.image}`}
                    alt=""
                    className="home-image"
                  />
                </Link>
              );
            })}
          </div>
          <div className="center-left blocks">
            {Cleft.map((i) => {
              return (
                <Link to="/image/:id">
                  <img
                    src={`http://localhost:3400${i.image}`}
                    alt=""
                    className="home-image"
                  />
                </Link>
              );
            })}
          </div>
          <div className="center-right blocks">
            {Cright.map((i) => {
              return (
                <Link to="/image/:id">
                  <img
                    src={`http://localhost:3400${i.image}`}
                    alt=""
                    className="home-image"
                  />
                </Link>
              );
            })}
          </div>
          <div className="down-left blocks">
            {Bleft.map((i) => {
              return (
                <Link to="/image/:id">
                  <img
                    src={`http://localhost:3400${i.image}`}
                    alt=""
                    className="home-image"
                  />
                </Link>
              );
            })}
          </div>
          <div className="down-right blocks">
            {Bright.map((i) => {
              return (
                <Link to="/image/:id">
                  <img
                    src={`http://localhost:3400${i.image}`}
                    alt=""
                    className="home-image"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
