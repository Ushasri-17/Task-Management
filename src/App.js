import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
  });

  const [tasks, setTasks] = useState([]);

  const loginUser = async () => {
    try {
      await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      setLoggedIn(true);
    } catch (error) {
      alert("Login Failed");
    }
  };

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:8080/auth/register", registerData);
      alert("Registration Successful");
      setShowRegister(false);
    } catch (error) {
      alert("Registration Failed");
    }
  };

  const createTask = async () => {
  if (
    !task.title ||
    !task.description ||
    !task.status ||
    !task.priority ||
    !task.assignedTo ||
    !task.dueDate
  ) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/tasks",
      task
    );

    setTasks([...tasks, response.data]);

    setTask({
      title: "",
      description: "",
      status: "",
      priority: "",
      assignedTo: "",
      dueDate: "",
    });
  } catch (error) {
    alert("Task Creation Failed");
  }
};

  if (loggedIn) {
    return (
      <div className="container mt-5">
        <h1 className="text-center">Team Task Manager</h1>

        <div className="card p-4 mt-4">
          <h3>Create Task</h3>

          <input
            className="form-control mt-2"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />

          <input
            className="form-control mt-2"
            placeholder="Description"
            value={task.description}
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
          />

          <input
            className="form-control mt-2"
            placeholder="Status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          />

          <input
            className="form-control mt-2"
            placeholder="Priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          />

          <input
            className="form-control mt-2"
            placeholder="Assign To"
            value={task.assignedTo}
            onChange={(e) =>
              setTask({ ...task, assignedTo: e.target.value })
            }
          />

          <input
            type="date"
            className="form-control mt-2"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />

          <button className="btn btn-success mt-3" onClick={createTask}>
            Create Task
          </button>
        </div>

        <div className="card p-4 mt-4">
          <h3>Task List</h3>
          {tasks.map((t, index) => (
            <div key={index} className="border p-2 mt-2">
              <h5>{t.title}</h5>
              <p>{t.description}</p>
              <p>Status: {t.status}</p>
              <p>Assigned To: {t.assignedTo}</p>
            </div>
          ))}
        </div>

        <button
          className="btn btn-danger mt-3"
          onClick={() => setLoggedIn(false)}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Team Task Manager</h1>

      <div className="card p-4 mt-4 col-md-6 mx-auto">
        {showRegister ? (
          <>
            <h3 className="text-center">Register</h3>

            <input
              className="form-control mt-2"
              placeholder="Name"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  name: e.target.value,
                })
              }
            />

            <input
              className="form-control mt-2"
              placeholder="Email"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              className="form-control mt-2"
              placeholder="Password"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
            />

            <select
              className="form-control mt-2"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  role: e.target.value,
                })
              }
            >
              <option>MEMBER</option>
              <option>ADMIN</option>
            </select>

            <button
              className="btn btn-success mt-3"
              onClick={registerUser}
            >
              Register
            </button>

            <button
              className="btn btn-link"
              onClick={() => setShowRegister(false)}
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <h3 className="text-center">Login</h3>

            <input
              type="email"
              className="form-control mt-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mt-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary mt-3" onClick={loginUser}>
              Login
            </button>

            <button
              className="btn btn-link"
              onClick={() => setShowRegister(true)}
            >
              New User? Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;