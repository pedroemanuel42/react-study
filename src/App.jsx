import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

let idCount = 0;
const generateId = () => {
  idCount += 1;
  return idCount;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state,
    };

    setTasks((existingTasks) => [...existingTasks, newTask]);
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => setTasks((existingTasks) => existingTasks.filter(task => task.id !== id));

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((task) => task.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Fazendo"
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((task) => task.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Completa"
          onAddTask={addTask}
          taskState="Completa"
          tasks={tasks.filter((task) => task.state === "Completa")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
