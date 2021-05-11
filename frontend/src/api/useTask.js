import useClient from './useClient';
import { useAuth } from './../useAuth';
import { useHistory } from "react-router-dom";

const useTask = () => {
  const auth = useAuth();
  const client = useClient();
  const history = useHistory();
  const headers = {
    'headers': {
      'x-access-token': auth.getAccessToken()
    }
  }

  const read = () => {
    return client.fetch('tasks', headers)
      .then(result => result.items)
      .catch(err => {
        if (err.message === '401') {
          auth.logout();
          history.push('/login');
        }
      });
  }

  const create = (name) => client.fetch('tasks', { body: { name: name } })
    .then(result => result.data);

  const remove = (taskId) => client.fetch(`tasks/${taskId}`, { method: 'DELETE' });

  return { read, create, remove };
}

export default useTask;