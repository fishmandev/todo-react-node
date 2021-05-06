import './App.css';
import Todo from './components/Todo';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Todo} />
      <Route path="/login" component={Login} />
    </Switch>

  );
}

export default App;
