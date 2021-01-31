import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/sign-in" component={SignIn} exact />
        <Route path="/dashboard" component={Dashboard} exact />        
      </Switch>
    </Router>   
  );
}

export default Routes;
