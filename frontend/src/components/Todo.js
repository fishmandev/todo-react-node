import React, { useState, useEffect } from 'react';
import useTask from './../api/useTask';
import CreateTask from './CreateTask';
import List from './List';
import './Todo.css'

const ToDo = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');
  const Task = useTask();

  useEffect(() => {
    Task.read().then(setList);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTask = (id) => {
    Task.remove(id).then(() => {
      setList(list.filter((item) => item.id !== id));
    }).catch(err => {
      // TODO Add error handler
    });
  };

  const handleCreateTaskInputChange = (value) => {
    setTask(value);
  }

  const handleCreateTaskEnterKeyPress = () => {
    if (!task) {
      return; // Not valid
    }
    Task.create(task).then((newId) => {
      const newTask = { id: newId, name: task };
      setList([...list, newTask]);
      setTask('');
    }).catch(err => {
      // TODO Add error handler
    });
  }

  return (
    <div className='todo'>
      <div className='container'>
        <CreateTask
          value={task}
          onCreateTaskChange={handleCreateTaskInputChange}
          onCreateTaskEnterKeyPress={handleCreateTaskEnterKeyPress}
        />
        <List list={list} onDeleteTask={deleteTask} />
      </div>
    </div>
  );
};

export default ToDo;