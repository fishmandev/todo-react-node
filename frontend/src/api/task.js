import client from './client';

/**
 * Retrieves all tasks
 *
 * @returns {Promise<Response>}
 */
const read = (accessToken) => {
  return client('tasks', {
    'headers': {
      'x-access-token': accessToken
    }
  }).then(result => {
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
  return client(`tasks/${taskId}`, { method: 'DELETE' });
};

/**
 * Creates a new task with the specified name
 *
 * @param name
 * @returns {Promise<Response>}
 */
const create = (name) => {
  return client('tasks', { body: { name: name } })
    .then(result => {
      return result.data;
    });
};

export { read, remove, create };