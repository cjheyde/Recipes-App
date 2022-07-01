import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import ComponentFood from '../components/ComponentFood';
import ShareAndFavotiteDrinksBtn from '../components/ShareAndFavotiteDrinksBtn';
import '../CSS/DrinkDetails.css';

// req.43
// const copy = require('clipboard-copy');

function DrinkDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [drinkApi, setDrink] = useState([]);
  const location = useLocation();
  const pathname = location.pathname.split('/')[2];
  // const [done, setDone] = useState([]);
  const id = location.pathname.split('/')[2];
  // req.43
  // const [showClipboardsMessage, setShowClipboardMessage] = useState(false);

  useEffect(() => {
    const apiDrink = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname}`;
      const response = await fetch(url);
      const { drinks } = await response.json();
      setDrink(drinks[0]);
    };
    apiDrink();
  }, [pathname]);

  useEffect(() => {
    // const doneRecipes = localStorage.getItem('doneRecipes') || [];
    // setDone(doneRecipes);
    const ingred = [];
    const measu = [];
    Object.entries(drinkApi).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingred.push(value);
      }
    });
    Object.entries(drinkApi).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        measu.push(value);
      }
    });
    setIngredients(ingred);
    setMeasure(measu);
  }, [drinkApi]);
  const history = useHistory();
  // const disable = done.length === 0 ? false : done.find((el) => el.id === id);
  // console.log(disable);
  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          src={ drinkApi.strDrinkThumb }
          alt={ drinkApi.strDrink }
        />
      </div>
      <div>
        <h1 data-testid="recipe-title">{drinkApi.strDrink}</h1>
        {/* req.43 */}
        <ShareAndFavotiteDrinksBtn drinkApi={ drinkApi } />
      </div>
      <div>
        <p data-testid="recipe-category">{ drinkApi.strAlcoholic }</p>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredients.map((el, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${el} ${measure[index]}`}
              </li>))
          }
        </ul>
      </div>
      <div>
        <h1>Instructions</h1>
        <p data-testid="instructions">{ drinkApi.strInstructions }</p>
      </div>
      <div>
        <h1>Recommended</h1>
        <ComponentFood />
      </div>

      <button
        className="buttonStartRecipe"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/drinks/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    </section>
  );
}

export default DrinkDetails;
