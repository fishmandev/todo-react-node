import React, {useState} from 'react';
import Item from './Item';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');

  const generateId = () => {
    if (list && list.length) {
      return Math.max(...list.map((item) => item.id)) + 1;
    } else {
      return 1;
    }
  };

  const createNewTask = () => {
    if (!task) {
      return; // Not valid
    }
    const newId = generateId();
    const newTask = {id: newId, text: task};
    setList([...list, newTask]);
    setTask('');
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
    setList(list.filter((item) => item.id !== id));
  };

  return (
      <div>
        <div>
          {list.map((item) => {
            return <Item key={item.id} item={item} deleteTask={deleteTask}/>;
          })}
        </div>
        <div>
          <input type="text"
                 value={task}
                 onChange={handleInput}
                 onKeyPress={handleKeyPress}
          />
        </div>
      </div>
  );
};

export default ToDo;