import React, { useState, useEffect } from 'react';
import useTask from './../api/useTask';
import CreateTask from './CreateTask';
import List from './List';
import './Todo.css'

const ToDo = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const Task = useTask();

  useEffect(() => {
    setIsLoaded(true);
    Task.read().then(setList).catch(err => {
      // TODO Add error handler
    }).finally(() => { setIsLoaded(false) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTask = (id) => {
    setIsLoaded(true);
    Task.remove(id).then(() => {
      setList(list.filter((item) => item.id !== id));
    }).catch(err => {
      // TODO Add error handler
    }).finally(() => {
      setIsLoaded(false);
    });
  };

  const handleCreateTaskInputChange = (value) => {
    setTask(value);
  }

  const handleCreateTaskEnterKeyPress = () => {
    if (!task) {
      return; // Not valid
    }
    setIsLoaded(true);
    Task.create(task).then((newId) => {
      const newTask = { id: newId, name: task };
      setList([...list, newTask]);
      setTask('');
    }).catch(err => {
      // TODO Add error handler
    }).finally(() => {
      setIsLoaded(false);
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
      { isLoaded && <div className="loader"></div>}
    </div>
  );
};

export default ToDo;