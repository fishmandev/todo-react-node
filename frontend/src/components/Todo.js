import React, { useState, useEffect } from 'react';
import { read, remove, create } from '../api/task';
import CreateTask from './CreateTask';
import { useHistory } from "react-router-dom";
import { useAuth } from './../useAuth';
import List from './List';
import './Todo.css'

const ToDo = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    read(auth.token).then(setList)
      .catch(err => {
        if (err.message === '401') {
          auth.logout();
          history.push('/login');
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTask = (id) => {
    remove(id).then(() => {
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
    create(task).then((newId) => {
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