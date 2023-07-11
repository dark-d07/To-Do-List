import React, { useState, useRef, useEffect } from 'react';
import DraggableComponent from './DraggableComponent';
import TaskList from './TaskList';

const App = () => {
  const [showInterface, setShowInterface] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskNameError, setTaskNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (showInterface) {
      inputRef.current.focus();
    }
  }, [showInterface]);

  const handleAddTask = () => {
    setShowInterface(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setTaskNameError(false);
    setDateError(false);
    setTimeError(false);

    if (!taskName.trim()) {
      setTaskNameError(true);
    }
    if (!date.trim()) {
      setDateError(true);
    }
    if (!time.trim()) {
      setTimeError(true);
    }

    if (!taskName.trim() || !date.trim() || !time.trim()) {
      return;
    }

    addTask();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTask();
    }
  };

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      taskName,
      date,
      time,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setDate('');
    setTime('');
    setShowInterface(false);
  };

  const handleTaskCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const touch = event.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    targetElement.click();
  };

  const handleDateTouchStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const targetElement = event.target;
    targetElement.focus();
  };

  const handleTimeTouchStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const targetElement = event.target;
    targetElement.focus();
  };

  return (
    <div>
      <div className="test">To-Do-List⏲️</div>
      <div className="Layered-card">
        <div className="search-box">
          <button className="Add" onClick={handleAddTask} onTouchStart={handleTouchStart}>
            Add Task
          </button>
          <input
            type="text"
            className="search-box__input"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="layered-Card-content"></div>
      </div>
      <div className="test2">Check Your Task👇</div>
      <TaskList tasks={tasks} handleTaskCheckboxChange={handleTaskCheckboxChange} />
      {showInterface && (
        <DraggableComponent>
          <div className="interface" onTouchStart={handleTouchStart}>
            <h2>Add Task</h2>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="taskName">Task Name:</label>
              <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                ref={inputRef}
              />
              {taskNameError && (
                <div className="error-message" style={{ color: 'Red' }}>
                  Please enter a task name.
                </div>
              )}
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                onFocus={handleDateTouchStart}
              />
              {dateError && (
                <div className="error-message" style={{ color: 'Red' }}>
                  Please enter a valid date.
                </div>
              )}
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={handleTimeChange}
                onFocus={handleTimeTouchStart}
              />
              {timeError && (
                <div className="error-message" style={{ color: 'Red' }}>
                  Please enter a valid time.
                </div>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        </DraggableComponent>
      )}
    </div>
  );
};

export default App;
