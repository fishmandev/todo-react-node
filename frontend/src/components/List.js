import React from 'react';
import Item from './Item';

const List = (props) => {
  const {list, onDeleteTask} = props;

  return <div className='list'>
    {list.map((item) => {
      return <Item key={item.id} item={item} onDeleteTask={onDeleteTask} />;
    })}
  </div>
}

export default List;