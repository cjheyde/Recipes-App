import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Foods from './pages/FoodsPage';
import UserProvider from './MyContext/UserProvider';

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route exact path="/foods" component={ Foods } />
      </Switch>
    </UserProvider>
  );
}

export default App;
