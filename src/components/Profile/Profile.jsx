import React from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../main";
import "./profile.css";
const Profile = () => {
  const { userData, isAuthenticated, setIsAuthenticated } = useContext(Context);
  return (
    <div className="profile-container">
      <h1 className="profile-data">Username: {userData?.name}</h1>
      <h3 className="profile-data">Email: {userData?.email}</h3>
    </div>
  );
};

export default Profile;
