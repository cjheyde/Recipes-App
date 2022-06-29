import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ComponentDrink from '../components/ComponentDrink';
import '../CSS/FoodDetails.css';

function FoodDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [meal, setMeal] = useState([]);
  const location = useLocation();
  const pathname = location.pathname.split('/')[2];
  const [url1, setUrl] = useState([]);
  const [done, setDone] = useState([]);
  const id = location.pathname.split('/')[2];

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
    const doneRecipes = localStorage.getItem('doneRecipes') || [];
    setDone(doneRecipes);
    // randomApi();
    const ingred = [];
    const measu = [];
    Object.entries(meal).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingred.push(value);
      }
    });
    Object.entries(meal).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        measu.push(value);
      }
    });
    setIngredients(ingred);
    setMeasure(measu);
  }, [meal, id]);
  const history = useHistory();
  const disable = done.find((el) => el.id === id).toString();
  console.log(disable);
  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
        />
      </div>
      <div>
        <h1 data-testid="recipe-title">{meal.strMeal}</h1>
        <a
          data-testid="share-btn"
          href={ `https://www.facebook.com/sharer/sharer.php?u=${useHistory.location}` }
        >
          <img width="25" height="25" src={ shareIcon } alt="share" />
        </a>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ blackHeartIcon } alt="favorite" width="25" height="25" />
        </button>
      </div>
      <div>
        <p data-testid="recipe-category">{meal.strCategory}</p>
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
        <p data-testid="instructions">{ meal.strInstructions }</p>
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
      <button
        className="buttonStartRecipe"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/foods/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    </section>
  );
}

export default FoodDetails;
