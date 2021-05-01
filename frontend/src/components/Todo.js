import React, { useState, useEffect } from 'react';
import Item from './Item';
import { read, remove, create } from '../api/task';
import './Todo.css'
import CreateTask from './CreateTask';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    read().then(setList)
      .catch(err => {
        // TODO Add error handler
      });
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
    <div className='list'>
      <div className='container'>
        <CreateTask
          value={task}
          onCreateTaskChange={handleCreateTaskInputChange}
          onCreateTaskEnterKeyPress={handleCreateTaskEnterKeyPress}
        />
        <div className='content'>
          {list.map((item) => {
            return <Item key={item.id} item={item} deleteTask={deleteTask} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDo;