import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/FloatingHambo/Navbar'
import Header from './components/FloatingHambo/Header'
import Exam from './components/Exam/Exam'
import Alerts from './components/Layout/Alerts'
import setAuthToken from './utils/setAuthToken'
import Contribute from './components/Contribute/Contribute'
import Flashcards from './components/Flashcards/Flashcards'
import Home from './components/Home/Home'
import Forum from './components/Forum/Forum'

import AuthState from './context/auth/authState'
import AlertState from './context/alert/alertState'
import ExamState from './context/exam/examState'

import PrivateRoute from './components/Routing/PrivateRoute'

import './index.css'

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState><AlertState><ExamState>

      <Router>
        <Navbar />
        <Header />
        <Alerts />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/exam' component={Exam} />
            <Route exact path='/flashcards' component={Flashcards} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/forum' component={Forum} />
            <PrivateRoute exact path='/contribute' component={Contribute} />
          </Switch>
          {/* <div style={{height: "2000px"}}> </div>  */}
      </Router>

      </ExamState></AlertState></AuthState>
  );
}

export default App;
