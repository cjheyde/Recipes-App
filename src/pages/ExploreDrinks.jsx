import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';

function ExploreDrink() {
  const history = useHistory();
  const { randomFoodAndDrinks } = useContext(RecipesContext);
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  const handleByIngredient = () => {
    setHeaderState('Explore Ingredient');
    setSearchBar(false);
    setFoods(false);
    history.push('/explore/drinks/ingredients');
  };

  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ handleByIngredient }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/drinks/${randomFoodAndDrinks
            .drink[0].idDrink}`) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrink;
