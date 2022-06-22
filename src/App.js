import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import UserProvider from './MyContext/UserProvider';
import RecipesProvider from './MyContext/RecipesProvider';
import HeaderProvider from './MyContext/headerProvider';
import Explore from './pages/Explorer';
import Profile from './pages/Profile';
import FavoriteRecepies from './pages/FavoriteRecepies';
import DoneRecepies from './pages/DoneRecepies';
import ExploreFoodIng from './pages/ExploreFoodIng';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinkIng from './pages/ExploreDrinkIng';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreNationality from './pages/ExploreNationality';

function App() {
  return (
    <UserProvider>
      <HeaderProvider>
        <RecipesProvider>
          <Switch>
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/foods" component={ Foods } />
            <Route exact path="/foods/:id" />
            <Route exact path="/foods/:id/in-progress" />
            <Route exact path="/cocktails" component={ Drinks } />
            <Route exact path="/cocktails/:id/in-progress" />
            <Route exact path="/cocktails/explore" component={ ExploreDrinks } />
            <Route exact path="/foods/explore/foods" component={ ExploreFoods } />
            <Route
              exact
              path="/foods/explore/foods/ingredients"
              component={ ExploreFoodIng }
            />
            <Route
              exact
              path="/cocktails/explore/ingredients"
              component={ ExploreDrinkIng }
            />
            <Route
              exact
              path="/foods/explore/foods/nationalities"
              component={ ExploreNationality }
            />
            <Route exact path="/explore" component={ Explore } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecepies } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecepies } />
          </Switch>
        </RecipesProvider>
      </HeaderProvider>
    </UserProvider>
  );
}

export default App;
