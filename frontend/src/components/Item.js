import React from 'react';

const Item = (props) => {
  const {item, deleteTask} = props;

  return (
      <div>
        <p>{item.text}</p>
        <button onClick={() => deleteTask(item.id)}>-</button>
      </div>
  );
};

export default Item;