import { useState } from 'react';
import './App.css';

import ListItem from './components/ListItem';

function App() {
  const [todos, setTodos] = useState([
    { task: 'Make Todo List', completed: true },
    { task: 'Mark as Complete', completed: true },
    { task: 'Design and CSS', completed: false },
  ]);
  const [task, setTask] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [mode, setMode] = useState('light');

  const onInputChange = (e) => {
    setTask(e.target.value);
  };

  const onInputSubmit = (e) => {
    e.preventDefault();
    if (task.length > 0) {
      const newTask = { task: task, completed: false };
      setTodos((todos) => {
        return [...todos, newTask];
      });
    }
    setTask('');
  };

  const onClickDelete = (index) => {
    const newList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    setTodos(newList);
  };

  const completeTask = (index) => {
    const newTodos = todos.map((todo, todoIndex) => {
      if (index === todoIndex) {
        return { ...todo, completed: !todos[index].completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const onClickShowAll = () => {
    setShowAll(!showAll);
  };

  const completedListItem = (todo, index) => {
    if (!todo.completed) {
      return (
        <ListItem
          todo={todo}
          index={index}
          onClickDelete={onClickDelete}
          completeTask={completeTask}
        />
      );
    } else {
      return null;
    }
  };

  const allListItems = (todo, index) => {
    if (showAll) {
      return (
        <ListItem
          todo={todo}
          index={index}
          onClickDelete={onClickDelete}
          completeTask={completeTask}
        />
      );
    }
  };

  const onClickMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  const allCompleted = (todos) => {
    let completed = 0;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].completed) {
        completed++;
      }
    }
    return completed;
  };

  const modeStyles = () => {
    if (mode === 'light') {
      return 'App light';
    } else {
      return 'App dark';
    }
  };

  return (
    <div className={modeStyles()}>
      <div className='title'>
        <div className='todo-list-title'>Todo List</div>
        <div onClick={onClickMode} className='mode'>
          {mode === 'light' ? (
            <i className='fa-solid fa-sun'></i>
          ) : (
            <i className='fa-solid fa-moon'></i>
          )}
        </div>
      </div>
      <form className='todo-create-input'>
        <input
          className='todo-input'
          onChange={onInputChange}
          type='text'
          placeholder='Enter Task'
          value={task}
        />
        <input
          className='todo-button'
          onClick={onInputSubmit}
          type='submit'
          value='Submit'
        />
      </form>
      <div className='list-items'>
        <div className='action-buttons'>
          {todos.length === 0 ? (
            ''
          ) : (
            <button onClick={onClickShowAll} className='showAll'>
              {showAll ? 'Hide Completed' : 'Show Completed'}
            </button>
          )}
        </div>
        {todos.length === 0 ? (
          <div className='task-title'>Please enter a Task</div>
        ) : todos.length === allCompleted(todos) && !showAll ? (
          <div className='task-title'>All Tasks are Completed</div>
        ) : (
          <ul className='todo-list'>
            {todos.map((todo, index) =>
              showAll
                ? allListItems(todo, index)
                : completedListItem(todo, index)
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
