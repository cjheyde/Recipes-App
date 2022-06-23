import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import fetchAPI from '../services/api';

const doze = 12;

function ExploreDrinkIng() {
  const {
    explDrinkIngred, setExplDrinkIngred, setArrayCards,
  } = useContext(RecipesContext);

  if (explDrinkIngred !== null && explDrinkIngred !== undefined
    && explDrinkIngred.length > doze) {
    const newExplDrinkIngred = explDrinkIngred.slice(0, doze);
    setExplDrinkIngred(newExplDrinkIngred);
  }

  const history = useHistory();

  async function ingredientClick(ingredientName) {
    const newData = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    setArrayCards(newData.drinks);
    history.push('/drinks');
  }

  return (
    <>
      <Header />
      <div>
        { explDrinkIngred !== null && explDrinkIngred !== undefined
          && explDrinkIngred.map((ingredient, index) => (
            <div
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <button
                type="button"
                onClick={ () => ingredientClick(ingredient.strIngredient1) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                  alt="thumb"
                />
                <p data-testid={ `${index}-card-name` }>
                  { ingredient.strIngredient1 }
                </p>
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinkIng;
