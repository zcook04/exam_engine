import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/FloatingHambo/Navbar'
import Header from './components/FloatingHambo/Header'
import Exam from './components/Exam/Exam'
import Alerts from './components/Layout/Alerts'
import setAuthToken from './utils/setAuthToken'
import Contribute from './components/Contribute/Contribute'

import Login from './components/Auth/Login'

import AuthState from './context/auth/authState'
import AlertState from './context/alert/alertState'

import './index.css'

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState><AlertState>

      <Router>
        <Navbar />
        <Header />
        <Alerts />
          <Switch>
            
            <Route exact path='/' component={Exam} />
            <Route exact path='/exam' component={Exam} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/contribute' component={Contribute} />
          </Switch>
          {/* <div style={{height: "2000px"}}> </div>  */}
      </Router>
      </AlertState></AuthState>
  );
}

export default App;
