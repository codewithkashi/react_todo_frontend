import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import "./header.css";
import { toast } from "react-hot-toast";
import axios from "axios";
const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const logoutHandler = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.message);
      setIsAuthenticated(true);
    }
  };
  return (
    <nav>
      <div>
        <h2>TODO App</h2>
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/"} onClick={logoutHandler}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to={"/"}>Home</Link> <Link to={"/login"}>Login</Link>{" "}
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
