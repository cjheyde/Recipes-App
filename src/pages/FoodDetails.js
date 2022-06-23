import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    const { meals } = useState;
    const ingredient = meals.filter((el) => el.contains('strIngredient'))
      .filter((ele) => ele !== '');
    setIngredients(ingredient);
    setMeal(meals);
  }, []);

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
        <h1>{meal.strMeal}</h1>
        <a
          data-testid="share-btn"
          href={ `https://www.facebook.com/sharer/sharer.php?u=${useHistory.location}` }
        >
          <img width="25" height="25" src={ shareIcon } alt="share" />
        </a>
        <button
          type="button"
          // onClick={ favoriteMealClick }
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
            ingredients.map((el) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {el}
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
        <video
          controls
          src={ meal.strYoutube }
          data-testid="video"
        >
          <track
            default
            kind="captions"
            srcLang="en"
            src={ meal.strYoutube }
          />
        </video>
      </div>
      <div>
        <h1>Recommended</h1>
        { }
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
        // onClick={ onClickButton }
      >
        Start Recipe
      </button>
    </section>
  );
}

export default FoodDetails;
