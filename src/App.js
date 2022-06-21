import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProvider from './MyContext/UserProvider';
import MealsPage from './pages/MealsPage';
import CocktailsPage from './pages/CocktailsPage';

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/foods" component={ MealsPage } />
        <Route path="/cocktails" component={ CocktailsPage } />
      </Switch>
    </UserProvider>
  );
}

export default App;
