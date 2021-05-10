import client from './client';
import { useAuth } from './../useAuth';
import { useHistory } from "react-router-dom";

const useTask = () => {
  const auth = useAuth();
  const history = useHistory();
  const headers = {
    'headers': {
      'x-access-token': auth.token
    }
  }

  const read = () => {
    return client('tasks', headers)
      .then(result => result.items)
      .catch(err => {
        if (err.message === '401') {
          auth.logout();
          history.push('/login');
        }
      });
  }

  const create = (name) => client('tasks', { body: { name: name } })
    .then(result => result.data);

  const remove = (taskId) => client(`tasks/${taskId}`, { method: 'DELETE' });

  return { read, create, remove };
}

export default useTask;