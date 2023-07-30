import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./register.css";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHanler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/user/register",
        {
          name,
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
          ? (toast.success(response.data.message), setIsRegistered(true))
          : toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isRegistered) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="form-container">
      <form onSubmit={submitHanler}>
        <h1>Register</h1>

        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          <button className="button login">Sign up</button>
        </div>
        <span>
          Already member <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
