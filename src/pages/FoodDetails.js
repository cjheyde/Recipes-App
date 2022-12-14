import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import ComponentDrink from '../components/ComponentDrink';
import '../CSS/FoodDetails.css';
import ShareAndFavotiteMealsBtn from '../components/ShareAndFavotiteFoodsBtn';

// req.43
// const copy = require('clipboard-copy');

function FoodDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [mealApi, setMeal] = useState([]);
  const location = useLocation();
  const pathname = location.pathname.split('/')[2];
  const [url1, setUrl] = useState([]);
  // const [done, setDone] = useState([]);
  const id = location.pathname.split('/')[2];
  // req.43
  // const [showClipboardsMessage, setShowClipboardMessage] = useState(false);

  useEffect(() => {
    const apiMeal = async () => {
      const url2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname}`;
      const response = await fetch(url2);
      const { meals } = await response.json();
      setMeal(meals[0]);
      setUrl(meals[0].strYoutube.split('='));
    };
    apiMeal();
  }, [pathname]);

  useEffect(() => {
    // const doneRecipes = localStorage.getItem('doneRecipes') || [];
    // setDone(doneRecipes);
    // randomApi();
    const ingred = [];
    const measu = [];
    Object.entries(mealApi).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingred.push(value);
      }
    });
    Object.entries(mealApi).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        measu.push(value);
      }
    });
    setIngredients(ingred);
    setMeasure(measu);
  }, [mealApi, id]);
  const history = useHistory();
  // const disable = done.find((el) => el.id === id).toString();
  // console.log(disable);
  const checkLocal = JSON
    .parse(localStorage.getItem('doneRecipes'));

  let check = false;

  if (checkLocal === null) {
    check = false;
  } else {
    check = checkLocal.some((recipe) => recipe.id === mealApi.idMeal);
  }

  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          src={ mealApi.strMealThumb }
          alt={ mealApi.strMeal }
        />
      </div>
      <div>
        <h1 data-testid="recipe-title">{mealApi.strMeal}</h1>
        {/* req.43 */
          console.log('Meal Api', mealApi)
        }
        <ShareAndFavotiteMealsBtn mealApi={ mealApi } />
      </div>
      <div>
        <p data-testid="recipe-category">{mealApi.strCategory}</p>
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
        <p data-testid="instructions">{ mealApi.strInstructions }</p>
      </div>
      <div>
        <h1>Video</h1>
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${url1[1]}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h1>Recommended</h1>
      <ComponentDrink />
      { !check
        ? (
          <button
            className="buttonStartRecipe"
            data-testid="start-recipe-btn"
            type="button"
            onClick={ () => history.push(`/foods/${id}/in-progress`) }
          >
            Start Recipe
          </button>
        ) : console.log('check invalid')}
    </section>
  );
}

export default FoodDetails;
