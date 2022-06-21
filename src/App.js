import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProvider from './MyContext/UserProvider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
      </Switch>
    </UserProvider>
  );
}

export default App;
