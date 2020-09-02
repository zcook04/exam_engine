import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Exam from './components/Exam/Exam'
import AuthState from './context/auth/authState'
import Register from './components/Auth/register'
import Login from './components/Auth/login'

function App() {
  return (
    <AuthState>
      <Router>
        <Switch>
          <Route exact path='/exam' component={Exam} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
    </AuthState>
  );
}

export default App;
