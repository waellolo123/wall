import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "../../components/form/InputGroup";
import { LoginAction } from "../../redux/actions/authActions";

const Login = () => {
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
    dispatch(LoginAction(form, navigate));
  };
  return (
    <div className="login">
      <div className="login-container">
        <h2 className="login-titleBg">Login</h2>
        <form className="login-form" onSubmit={onSubmitHandler}>
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

          <button
            className="register-btn"
            type="submit"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Submit
          </button>
        </form>
        <p className="login-para">
          you don't have an account?{" "}
          <span>
            <Link to="/register" style={{ color: "rgb(41, 41, 41)" }}>
              Create an account
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
