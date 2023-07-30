import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./register.css";
import { Context } from "../../main";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHanler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      {
        response.data.success
          ? (toast.success(response.data.message),
            setIsAuthenticated(true),
            (<Navigate to={"/"} />))
          : toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHanler}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <button className="button login">Sign in</button>
        </div>
        <span>
          Already member <Link to={"/register"}>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
