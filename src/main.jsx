import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createContext, useState } from "react";

export const Context = createContext({ isAuthenticated: false });
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}
    >
      <App />
    </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
