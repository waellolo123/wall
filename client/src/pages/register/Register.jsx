import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../../components/form/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from "../../redux/actions/authActions";

const Register = () => {
  const [form, setform] = useState({});
  const errors = useSelector((state) => state.errors.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(RegisterAction(form, navigate));
  };
  return (
    <div className="register">
      <div className="register-container">
        <h2 className="login-titleBg">Register</h2>
        <form className="register-form" onSubmit={onSubmitHandler}>
          <InputGroup
            label={"Fullname"}
            name="fullname"
            type={"text"}
            placeholder={"Enter your fullname"}
            event={onChangeHandler}
            errors={errors.fullname}
          />
          <InputGroup
            label={"Email"}
            name="email"
            type={"text"}
            placeholder={"Enter your email"}
            event={onChangeHandler}
            errors={errors.email}
          />
          <InputGroup
            label={"Password"}
            name="password"
            type={"password"}
            placeholder={"Enter your password"}
            event={onChangeHandler}
            errors={errors.password}
          />
          <InputGroup
            label={"Confirm password"}
            name="confirm"
            type={"password"}
            placeholder={"Confirm your password"}
            event={onChangeHandler}
            errors={errors.confirm}
          />
          <button
            className="register-btn"
            type="submit"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Submit
          </button>
        </form>
        <p className="register-para">
          You have already an account?{" "}
          <span>
            <Link to="/login" style={{ color: "rgb(41, 41, 41)" }}>
              Login{" "}
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
