import React from 'react';
import './Item.css'

const Item = (props) => {
  const {item, onDeleteTask} = props;

  return (
      <div className='item'>
        <p className='item-text'>{item.name}</p>
        <button className='item-delete' onClick={() => onDeleteTask(item.id)}>-</button>
      </div>
  );
};

export default Item;