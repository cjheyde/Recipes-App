import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [drink, setDrink] = useState([]);
  const location = useLocation();
  const pathname = location.pathname.split('/')[2];
  const [food, setFood] = useState([]);

  useEffect(() => {
    const apiDrink = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname}`;
      const response = await fetch(url);
      const { drinks } = await response.json();
      setDrink(drinks[0]);
    };
    apiDrink();
  }, [pathname]);

  const randomApi = async () => {
    try {
      const urlRandomDirnks = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const responseRandomDirnks = await fetch(urlRandomDirnks);
      const { meals } = await responseRandomDirnks.json();
      setFood(meals);
      console.log(meals);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    randomApi();
    const ingred = [];
    const measu = [];
    Object.entries(drink).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingred.push(value);
      }
    });
    Object.entries(drink).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        measu.push(value);
      }
    });
    setIngredients(ingred);
    setMeasure(measu);
  }, [drink]);

  const n6 = 6;
  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          src={ drink.strMealThumb }
          alt={ drink.strDrink }
        />
      </div>
      <div>
        <h1 data-testid="recipe-title">{drink.strDrink}</h1>
        <a
          data-testid="share-btn"
          href={ `https://www.facebook.com/sharer/sharer.php?u=${useHistory.location}` }
        >
          <img width="25" height="25" src={ shareIcon } alt="share" />
        </a>
        <button
          type="button"
          // onClick={ favoriteDrinkClick }
          data-testid="favorite-btn"
        >
          <img src={ blackHeartIcon } alt="favorite" width="25" height="25" />
        </button>
      </div>
      <div>
        <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
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
        <p data-testid="instructions">{ drink.strInstructions }</p>
      </div>
      <div>
        <div>
          <h1>Recommended</h1>
        </div>
        <div>
          { food.slice(0, n6).map((element, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <img src={ element?.strMealThumb } alt="bebida recomendada" />
              <p>{ element?.strCategory }</p>
              <h3 data-testid={ `${index}-recomendation-title` }>
                { element?.strMeal }
              </h3>
            </div>
          )) }
        </div>
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
