import client from './client';

/**
 * Retrieves all tasks
 *
 * @returns {Promise<Response>}
 */
const read = () => {
  return client('tasks').then(result => {
    return result.items;
  });
};

/**
 * Deletes the selected task
 *
 * @param taskId
 * @returns {Promise<Response>}
 */
const remove = (taskId) => {
  return client(`tasks/${taskId}`, {method: 'DELETE'});
};

/**
 * Creates a new task with the specified name
 *
 * @param name
 * @returns {Promise<Response>}
 */
const create = (name) => {
  return client('tasks', {body: {name: name}})
    .then(result => {
      return result.data;
  });
};

export {read, remove, create};