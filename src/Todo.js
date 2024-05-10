import React, { useState, useEffect } from "react";
import "./Todo.css";

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}

      <button onClick={() => completeTask(index)}> Completed</button>
      <button style={{ background: "red" }} onClick={() => removeTask(index)}>
        X
      </button>
    </div>
  );
}

export default function Todo() {
  let [tasksRemaining, setTasksRemaining] = useState(0);

  let [tasks, setTasks] = useState([
    {
      title: "Make Dinner",
      completed: true,
    },
    {
      title: "Workout",
      completed: true,
    },
    {
      title: "Do Dishes",
      completed: false,
    },
  ]);
  useEffect(() => {
    setTasksRemaining(tasks.filter((task) => !task.completed).length);
  }, [setTasksRemaining]);

  let addTask = (title) => {
    let newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };
  let completeTask = (index) => {
    let newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };
  let removeTask = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="todo-container">
      <div className="header"> TODO - LIST</div>
      <div className="pending">Pending Tasks ({tasksRemaining})</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            completeTask={completeTask}
            removeTask={removeTask}
            key={index}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}
function CreateTask({ addTask }) {
  let [value, setValue] = useState("");

  let handleSubmit = (event) => {
    event.preventDefault();
    if (!value) return;

    addTask(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
}
