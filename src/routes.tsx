import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn';
import PasswordForgot from './pages/PasswordForgot';
import NewPassword from './pages/NewPassword';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/dashboard" component={Dashboard}  />        
        <Route path="/sign-in" component={SignIn}  />
        <Route path="/forgot-password" component={PasswordForgot}  />
        <Route path="/new-password" component={NewPassword}  />
      </Switch>
    </Router>   
  );
}

export default Routes;
