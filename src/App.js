import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProvider from './MyContext/UserProvider';
import SearchBarHeader from './components/SearchBarHeader';

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/foods" component={ SearchBarHeader } />
      </Switch>
    </UserProvider>
  );
}

export default App;
