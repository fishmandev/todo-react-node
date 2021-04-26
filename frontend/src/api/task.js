import client from './client';

const read = () => {
  return client('tasks').then(result => {
    return result.items;
  });
};

const remove = (taskId) => {
  return client(`tasks/${taskId}`, {method: 'DELETE'});
};

const create = (name) => {
  return client('tasks', {body: {name: name}})
    .then(result => {
      return result.data;
  });
};

export {read, remove, create};