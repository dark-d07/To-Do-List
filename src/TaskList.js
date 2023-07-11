import React from 'react';

const TaskList = ({ tasks, handleTaskCheckboxChange }) => {
  return (
    <div className="lc">
      {tasks.length === 0 ? (
        <div
          className="no-tasks"
        >
          Currently no tasks
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div
              className={`lcc ${task.completed ? 'completed' : ''}`}
              key={task.id}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCheckboxChange(task.id)}
              />
              <span>
                {task.taskName.length > 10
                  ? `${task.taskName.substring(0, 10)}...`
                  : task.taskName}
              </span>
              <span>Date: {task.date}</span>
              <span>Time: {task.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
