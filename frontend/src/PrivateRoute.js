import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './useAuth';

function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();

  return (
    <Route {...rest} render={(props) => (
      auth.token !== null
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
  
};

export default PrivateRoute;