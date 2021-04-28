import React, {useState, useEffect} from 'react';
import Item from './Item';
import {read, remove, create} from '../api/task';
import './List.css'

const ToDo = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    read().then(setList)
      .catch(err => {
        // TODO Add error handler
      });
  }, []);

  const createNewTask = () => {
    if (!task) {
      return; // Not valid
    }
    create(task).then((newId) => {
      const newTask = {id: newId, name: task};
      setList([...list, newTask]);
      setTask('');
    }).catch(err => {
      // TODO Add error handler
    })
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      createNewTask();
    }
  };

  const handleInput = (e) => {
    setTask(e.target.value);
  };

  const deleteTask = (id) => {
    remove(id).then(() => {
      setList(list.filter((item) => item.id !== id));
    }).catch(err => {
      // TODO Add error handler
    })

  };

  return (
      <div className='list'>
        <div className='container'>
          <div className='input'>
            <input type="text"
                   value={task}
                   onChange={handleInput}
                   onKeyPress={handleKeyPress}
            />
          </div>
          <div className='content'>
            {list.map((item) => {
              return <Item key={item.id} item={item} deleteTask={deleteTask}/>;
            })}
          </div>
        </div>
      </div>
  );
};

export default ToDo;