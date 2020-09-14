import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/FloatingHambo/Navbar';
import Header from './components/FloatingHambo/Header';
import Exam from './components/Pages/Exam/Exam';
import Alerts from './components/Alerts/Alerts';
import setAuthToken from './utils/setAuthToken';
import Contribute from './components/Pages/Contribute/Contribute';
import Flashcards from './components/Pages/Flashcards/Flashcards';
import Home from './components/Pages/Home/Home';
import Forum from './components/Pages/Forum/Forum';
import Login from './components/Pages/Login/Login';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/Routing/PrivateRoute';

import './index.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Header />
        <Alerts />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/exam" component={Exam} />
          <Route exact path="/flashcards" component={Flashcards} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Home} />
          <PrivateRoute exact path="/forum" component={Forum} />
          <PrivateRoute exact path="/contribute" component={Contribute} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
