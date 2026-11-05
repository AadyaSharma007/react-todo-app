
import React, { Component } from "react";
import "./App.css";

// Function Component
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <span
        onClick={() => onToggle(task.id)}
        className={task.done ? "completed" : ""}
      >
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

// Class Component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      tasks: []
    };
  }

  // Handle input changes
  handleChange = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  // Add task
  addTask = () => {
    const taskText = this.state.text.trim();

    if (taskText === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
      text: ""
    });
  };

  // Toggle task completion
  toggleTask = (id) => {
    this.setState({
      tasks: this.state.tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    });
  };

  // Delete task
  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(
        (task) => task.id !== id
      )
    });
  };

  render() {
    const totalTasks = this.state.tasks.length;

    const completedTasks = this.state.tasks.filter(
      (task) => task.done
    ).length;

    return (
      <div className="container">
        <h1>My To-Do List</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={this.state.text}
            onChange={this.handleChange}
          />

          <button onClick={this.addTask}>
            Add
          </button>
        </div>

        <h3>
          {completedTasks} of {totalTasks} tasks done
        </h3>

        {totalTasks === 0 ? (
          <p className="empty-message">
            No tasks yet. Add one!
          </p>
        ) : (
          <ul>
            {this.state.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={this.toggleTask}
                onDelete={this.deleteTask}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
