import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditStart = (task) => {
    setEditId(task.id);
    setEditValue(task.text);
  };

  const handleEditSave = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editValue } : task
    ));
    setEditId(null);
    setEditValue('');
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter a task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task.id)}
            />

            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleEditSave(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => handleEditStart(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;