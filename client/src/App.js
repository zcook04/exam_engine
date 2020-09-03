import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/FloatingHambo/Navbar'
import Header from './components/FloatingHambo/Header'
import Exam from './components/Exam/Exam'

import Register from './components/Auth/register'
import Login from './components/Auth/login'

import AuthState from './context/auth/authState'
import AlertState from './context/alert/alertState'

function App() {
  return (
    <AuthState><AlertState>

      <Router>
        <Navbar />
        <Header />
          <Switch>

            <Route exact path='/' component={Exam} />
            <Route exact path='/exam' component={Exam} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
          <div style={{height: "2000px"}}> </div>
      </Router>
      </AlertState></AuthState>
  );
}

export default App;
