import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [assignedTo, setAssignedTo] = useState("");
const [dueDate, setDueDate] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 // Add Task
const addTask = async () => {
  if (!title || !description) return;

  try {
    await axios.post("http://localhost:5000/api/tasks", {
  title,
  description,
  status,
  assignedTo,
  dueDate,
});
    // Get the latest tasks from MongoDB
    await fetchTasks();

    // Clear the form
    setTitle("");
    setDescription("");
    setStatus("To Do");
    setAssignedTo("");
    setDueDate("");
  } catch (err) {
    console.log(err);
  }
};

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Fill form for editing
 const editTask = (task) => {
  setEditingId(task._id);
  setTitle(task.title);
  setDescription(task.description);
  setStatus(task.status);
  setAssignedTo(task.assignedTo || "");
  setDueDate(task.dueDate ? task.dueDate.substring(0, 10) : "");
};
  // Update Task
const updateTask = async () => {
  try {
    await axios.put(
  `http://localhost:5000/api/tasks/${editingId}`,
  {
    title,
    description,
    status,
    assignedTo,
    dueDate,
  }
);
// Refresh tasks from MongoDB
    await fetchTasks();

    // Clear form
    setEditingId(null);
    setTitle("");
    setDescription("");
    setStatus("To Do");
    setAssignedTo("");
setDueDate("");
  } catch (err) {
    console.log(err);
  }
};

//task
const totalTasks = tasks.length;

const todoTasks = tasks.filter(
  (task) => task.status === "To Do"
).length;

const inProgressTasks = tasks.filter(
  (task) => task.status === "In Progress"
).length;

const completedTasks = tasks.filter(
  (task) => task.status === "Completed"
).length;

  return (
  <div className="container">

    <h1>📋 Project Management Tool</h1>
    <div className="stats">

  <div className="stat-card">
    <h3>Total Tasks</h3>
    <p>{totalTasks}</p>
  </div>

  <div className="stat-card">
    <h3>📌 To Do</h3>
    <p>{todoTasks}</p>
  </div>

  <div className="stat-card">
    <h3>🚧 In Progress</h3>
    <p>{inProgressTasks}</p>
  </div>

  <div className="stat-card">
    <h3>✅ Completed</h3>
    <p>{completedTasks}</p>
  </div>

</div>

    <div className="form">

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
  type="text"
  placeholder="Assigned To"
  value={assignedTo}
  onChange={(e) => setAssignedTo(e.target.value)}
/>

<input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
/>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      {editingId ? (
        <button onClick={updateTask}>Update Task</button>
      ) : (
        <button onClick={addTask}>Add Task</button>
      )}

    </div>
    

    <div className="board">

      <div className="column">

        <h2>📌 To Do</h2>

        {tasks
          .filter((task) => task.status === "To Do")
          .map((task) => (
            <div className="task-card" key={task._id}>

              <h3>{task.title}</h3>

              <p>{task.description}</p>
              <p>
  <strong>Assigned To:</strong> {task.assignedTo}
</p>

<p>
  <strong>Due Date:</strong>{" "}
  {task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No Due Date"}
</p>

              <button
                className="edit-btn"
                onClick={() => editTask(task)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>

            </div>
          ))}

      </div>

      <div className="column">

        <h2>🚧 In Progress</h2>

        {tasks
          .filter((task) => task.status === "In Progress")
          .map((task) => (
            <div className="task-card" key={task._id}>

              <h3>{task.title}</h3>

              <p>{task.description}</p> 
              <p>
  <strong>Assigned To:</strong> {task.assignedTo}
</p>

<p>
  <strong>Due Date:</strong>{" "}
  {task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No Due Date"}
</p>

              <button
                className="edit-btn"
                onClick={() => editTask(task)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>

            </div>
          ))}

      </div>

      <div className="column">

        <h2>✅ Completed</h2>

        {tasks
          .filter((task) => task.status === "Completed")
          .map((task) => (
            <div className="task-card" key={task._id}>

              <h3>{task.title}</h3>

              <p>{task.description}</p>
              <p>
  <strong>Assigned To:</strong> {task.assignedTo}
</p>

<p>
  <strong>Due Date:</strong>{" "}
  {task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No Due Date"}
</p>

              <button
                className="edit-btn"
                onClick={() => editTask(task)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>

            </div>
          ))}

      </div>

    </div>

  </div>
);
}

export default App;