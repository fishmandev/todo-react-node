import React from 'react';
import './CreateTask.css';

const CreateTask = (props) => {
  const {onCreateTaskChange, onCreateTaskEnterKeyPress, value} = props;

  const handleInputChange = (e) => {
    onCreateTaskChange(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter')
      onCreateTaskEnterKeyPress();
  }

  return <div className='input'>
    <input type="text"
      value={value}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
    />
  </div>
};

export default CreateTask;