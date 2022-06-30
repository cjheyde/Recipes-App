import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShareAndFavotiteDrinksBtn from '../components/ShareAndFavotiteDrinksBtn';

const criateStorage = () => {
  const cocktails = {};
  const meals = {};
  localStorage.setItem('InProgressRecipes', JSON.stringify({ cocktails, meals }));
};

function DrinkProgress() {
  const [drinkApi, setDrinkApi] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { id } = useParams();
  const [check, setCheck] = useState([]);

  useEffect(() => {
    const apiDrink = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const { drinks } = await response.json();
      setDrinkApi(drinks[0]);
    };
    apiDrink();
  }, [id]);

  useEffect(() => {
    const ingred = [];
    setIngredients(ingred);
    Object.entries(drinkApi).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingred.push(value);
      }
    });

    const measu = [];
    setMeasure(measu);
    Object.entries(drinkApi).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        measu.push(value);
      }
    });
  }, [drinkApi]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('InProgressRecipes'))) {
      criateStorage();
    }
    const { cocktails: testeLocal } = JSON.parse(localStorage
      .getItem('InProgressRecipes'));
    const haveRecipe = Object.keys(testeLocal).some((recipeId) => recipeId === id);
    if (!haveRecipe) {
      const getLocal = JSON.parse(localStorage.getItem('InProgressRecipes'));
      const newLocal = {
        ...getLocal,
        cocktails: {
          ...getLocal?.cocktails,
          [id]: [],
        },
      };
      localStorage.setItem('InProgressRecipes', JSON.stringify(newLocal));
    } else {
      const { cocktails: { [id]: recipe } } = JSON
        .parse(localStorage.getItem('InProgressRecipes'));
      setCheck(recipe);
    }
  }, [id]);

  const recoverRecipe = (ingredient) => {
    const getLocal = JSON.parse(localStorage.getItem('InProgressRecipes'));
    const { cocktails: { [id]: testeLocal } } = getLocal;
    const haveIngredient = testeLocal.some((recipeId) => recipeId === ingredient);
    if (!haveIngredient) {
      const { cocktails: teste } = JSON.parse(localStorage.getItem('InProgressRecipes'));
      const arrayIngredients = [...teste[id], ingredient];
      const newLocal = {
        ...getLocal,
        cocktails: {
          ...getLocal?.cocktails,
          [id]: [...teste[id], ingredient],
        },
      };
      setCheck(arrayIngredients);
      localStorage.setItem('InProgressRecipes', JSON.stringify({ ...newLocal }));
    } else {
      const { cocktails: { [id]: recipeIdmeals } } = JSON
        .parse(localStorage.getItem('InProgressRecipes'));
      const arrayWithoutIngedients = recipeIdmeals
        .filter((index) => index !== ingredient);
      setCheck(arrayWithoutIngedients);
      const newLocal = {
        ...getLocal,
        cocktails: {
          ...getLocal?.cocktails,
          [id]: [...arrayWithoutIngedients],
        },
      };
      localStorage.setItem('InProgressRecipes', JSON.stringify({ ...newLocal }));
    }
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ drinkApi?.strDrinkThumb }
        alt="Recipe"
      />
      <h3 data-testid="recipe-title">{ drinkApi?.strDrink }</h3>
      <ShareAndFavotiteDrinksBtn drinkApi={ drinkApi } />
      <p data-testid="recipe-category">{drinkApi?.strCategory}</p>
      <h1>Ingredients</h1>
      <div>
        {ingredients.map((value, index) => (
          <h3 key={ index } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ index }>
              <input
                id={ index }
                key={ index }
                type="checkbox"
                onClick={ () => recoverRecipe(index) }
                checked={ check.some((che) => che === index) }
              />
              {`${value} - ${measure[index]}`}
            </label>
          </h3>
        ))}
      </div>
      <div>
        <span data-testid="instructions">{drinkApi.strInstructionsIT}</span>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </section>
  );
}

export default DrinkProgress;
