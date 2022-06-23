import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetails() {
  const [ingredients, setIngredients] = useState([[], []]);
  const [drink, setDrink] = useState([]);
  // const [measureDrink, setMeasureDrink] = useState([]);

  useEffect(() => {
    const { drinks } = useState;
    const ingredient = drinks.filter((el) => el.contains('strIngredient'))
      .filter((ele) => ele !== null);
    const measures = drinks.filter((el) => el.contains('strMeasure'))
      .filter((ele) => ele !== null);
    setIngredients[0](ingredient);
    setIngredients[1](measures);
    setDrink(drinks);
  }, []);

  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
      </div>
      <div>
        <h1>{drink.strDrink}</h1>
        <a
          data-testid="share-btn"
          href={ `https://www.facebook.com/sharer/sharer.php?u=${useHistory.location}` }
        >
          <img src={ shareIcon } alt="compartilha" width="25" height="25" />
        </a>
        <button
          type="button"
          onClick={ favoriteDrinkClick }
          data-testid="favorite-btn"
        >
          <img src={ blackHeartIcon } alt="favorite" width="25" height="25" />
        </button>
      </div>
      <div>
        <p data-testid="recipe-category">{drink.strCategory}</p>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredients[0].map((el, index = 0) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {el + ingredients[1][index]}
              </li>))

          }
        </ul>
      </div>
      <div>
        <h1>Instructions</h1>
        <p data-testid="instructions">{ meals.strInstructions }</p>
      </div>
      <div>
        <h1>Video</h1>
        <video
          controls
          src={ meals.strYoutube }
          data-testid="video"
        >
          <track
            default
            kind="captions"
            srcLang="en"
            src={ meals.strYoutube }
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
        onClick={ onClickButton }
      >
        Start Recipe
      </button>
    </section>
  );
}

export default FoodDetails;
