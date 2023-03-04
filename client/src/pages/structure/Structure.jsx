import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddStructureAction } from "../../redux/actions/imagesActions";
import "./structure.css";



const Structure = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AddStucture = (value) => {
    dispatch(AddStructureAction(value, navigate));
  };
  return (
    <div className="structure">
      <h2 className="structure-title">Please choose your place</h2>
      <div className="structure-container">
        <div className="place1 places">
          <h3 className="place-title">
            <button
              className="place-btn"
              onClick={() => AddStucture("left")}
            >
              Up Left
            </button>
          </h3>
        </div>
        <div className="place2 places">
          <h3 className="place-title">
            <button
              onClick={() => AddStucture("right")}
              className="place-btn"
            >
              Up Right
            </button>
          </h3>
        </div>
        <div className="place3 places">
          <h3 className="place-title">
            <button
              className="place-btn"
              onClick={() => AddStucture("c-left")}
            >
              Center Left
            </button>
          </h3>
        </div>
        <div className="place4 places">
          <h3 className="place-title">
            <button
              onClick={() => AddStucture("c-right")}
              className="place-btn"
            >
              Center Right
            </button>
          </h3>
        </div>
        <div className="place5 places">
          <h3 className="place-title">
            <button
              className="place-btn"
              onClick={() => AddStucture("b-left")}
            >
              Bottom Left
            </button>
          </h3>
        </div>
        <div className="place6 places">
          <h3 className="place-title">
            <button
              onClick={() => AddStucture("b-right")}
              className="place-btn"
            >
              Bottom Right
            </button>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Structure;
