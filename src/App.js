import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProvider from './MyContext/UserProvider';

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
      </Switch>
    </UserProvider>
  );
}

export default App;
