import React, { useState } from 'react';
import './App.css'; // J'importe mon fichier CSS
import Header from './Header'; // J'importe mon header

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Ici j'initialise ma variable pour ajouter une task 
  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Ici je setup un input Entrer pour ajouter une nouvelle task plus rapidement
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  // Ici je fais en sorte de pouvoir marquer une task comme completed ou non
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => (
      i === index ? { ...task, completed: !task.completed } : task
    ));
    setTasks(updatedTasks);
  };

  // Ici j'initialise ma variable pour supprimer une task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Cette variable me permet de supprimet toutes les tasks completed en une fois
  const deleteCompletedTasks = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  return (
  <body>
    <div className="App">
      <Header />
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nouvelle tâche"
          className="task-input"
        />
        <button onClick={addTask} className="add-button">Ajouter</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span>{task.text}</span>
            <div className="button-group">
              <button onClick={() => toggleTaskCompletion(index)} className="complete-button">
                {task.completed ? "Annuler" : "Compléter"}
              </button>
              <button onClick={() => deleteTask(index)} className="delete-button">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={deleteCompletedTasks} className="clear-completed-button">Supprimer toutes les tâches complétées</button>
    </div>
</body>
  );
}

export default App;
