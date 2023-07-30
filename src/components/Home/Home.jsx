import React from "react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./home.css";
import TodoItem from "../Todoitem/TodoItem";
import { Navigate } from "react-router-dom";
const Home = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const todoHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/task/new",
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      response.data.success
        ? (toast.success(response.data.message),
          setRefresh(!refresh),
          setTitle(""),
          setDescription(""))
        : (toast.error(response.data.message), setRefresh(!refresh));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateTask = async (id) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:4000/task/${id}`,
        {},
        { withCredentials: true }
      );
      response.data.success
        ? (toast.success(response.data.message), setRefresh(!refresh))
        : (toast.error(response.data.message), setRefresh(!refresh));
    } catch (error) {
      toast.error(error.request.data.message);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:4000/task/${id}`, {
        withCredentials: true,
      });
      response.data.success
        ? (toast.success(response.data.message), setRefresh(!refresh))
        : (toast.error(response.data.message), setRefresh(!refresh));
    } catch (error) {
      toast.error(error.request.data.message);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:4000/task/all", { withCredentials: true })
      .then((response) => {
        response.data.success ? setTask(response.data.userTasks) : setTask([]);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="form-container">
      <form onSubmit={todoHandler}>
        <h1>Create Task</h1>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="buttons">
          <button className="button login">Create</button>
        </div>
      </form>
      <div className="task-wrapper">
        {task.map((e) => (
          <TodoItem
            title={e.title}
            description={e.description}
            isCompleted={e.isCompleted}
            updateHandler={updateTask}
            deleteHandler={deleteTask}
            id={e._id}
            key={e._id}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
