import React from 'react';
import Exam from './components/Exam/Exam'
import AuthState from './context/auth/authState'

function App() {
  return (
    <AuthState>
      <div className="App">
        <Exam />
      </div>
    </AuthState>
  );
}

export default App;
