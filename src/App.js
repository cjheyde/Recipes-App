import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProvider from './MyContext/UserProvider';
import RecipesProvider from './MyContext/RecipesProvider';
import MealsPage from './pages/MealsPage';
import Dirinks from './pages/Drinks';
import Details from './pages/Details';

function App() {
  return (
    <UserProvider>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route path="/foods" component={ MealsPage } />
          <Route path="/drinks" component={ Dirinks } />
          <Route path="/foods/:id" component={ Details } />
          <Route path="/drinks/:id" component={ Details } />
        </Switch>
      </RecipesProvider>
    </UserProvider>
  );
}

export default App;
