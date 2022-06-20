import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import UserProvider from './MyContext/UserProvider';

function App() {
  return (
    <UserProvider>
      <div className="meals">
        <LoginPage />
      </div>
    </UserProvider>
  );
}

export default App;
