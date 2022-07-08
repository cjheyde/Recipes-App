import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShareAndFavotiteMealsBtn from '../components/ShareAndFavotiteFoodsBtn';

const criateStorage = () => {
  const cocktails = {};
  const meals = {};
  localStorage.setItem('InProgressRecipes', JSON.stringify({ cocktails, meals }));
};

function FoodProgress() {
  const [mealApi, setMealApi] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { id } = useParams();
  const [check, setCheck] = useState([]);
  const [isDisabled, setIsDisabled] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const apiMeal = async () => {
      try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(url);
        const { meals: mealAPI } = await response.json();
        setMealApi(mealAPI[0]);
      } catch (error) {
        console.log(error);
      }
    };
    apiMeal();
  }, [id]);

  useEffect(() => {
    const ingred = [];
    setIngredients(ingred);
    Object.entries(mealApi).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingred.push(value);
      }
    });

    const measu = [];
    setMeasure(measu);
    Object.entries(mealApi).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        measu.push(value);
      }
    });
  }, [mealApi]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('InProgressRecipes'))) {
      criateStorage();
    }
    const { meals: testeLocal } = JSON.parse(localStorage.getItem('InProgressRecipes'));
    const haveRecipe = Object.keys(testeLocal).some((recipeId) => recipeId === id);
    if (!haveRecipe) {
      const getLocal = JSON.parse(localStorage.getItem('InProgressRecipes'));
      const newLocal = {
        ...getLocal,
        meals: {
          ...getLocal?.meals,
          [id]: [],
        },
      };
      localStorage.setItem('InProgressRecipes', JSON.stringify(newLocal));
    } else {
      const { meals: { [id]: recipe } } = JSON
        .parse(localStorage.getItem('InProgressRecipes'));
      setCheck(recipe);
    }
  }, [id, ingredients]);

  const recoverRecipe = (ingredient) => {
    const getLocal = JSON.parse(localStorage.getItem('InProgressRecipes'));
    const { meals: { [id]: testeLocal } } = getLocal;
    const haveIngredient = testeLocal.some((recipeId) => recipeId === ingredient);
    if (!haveIngredient) {
      const { meals: teste } = JSON.parse(localStorage.getItem('InProgressRecipes'));
      const arrayIngredients = [...teste[id], ingredient];
      const newLocal = {
        ...getLocal,
        meals: {
          ...getLocal?.meals,
          [id]: [...teste[id], ingredient],
        },
      };
      setCheck(arrayIngredients);
      localStorage.setItem('InProgressRecipes', JSON.stringify({ ...newLocal }));
      const { meals: { [id]: testeLocal2 } } = JSON
        .parse(localStorage.getItem('InProgressRecipes'));
      setIsDisabled(testeLocal2?.length);
    } else {
      const { meals: { [id]: recipeIdmeals } } = JSON
        .parse(localStorage.getItem('InProgressRecipes'));
      const arrayWithoutIngedients = recipeIdmeals
        .filter((index) => index !== ingredient);
      setCheck(arrayWithoutIngedients);
      const newLocal = {
        ...getLocal,
        meals: {
          ...getLocal?.meals,
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
        src={ mealApi?.strMealThumb }
        alt="Recipe"
      />
      <h3 data-testid="recipe-title">{ mealApi?.strMeal }</h3>
      <ShareAndFavotiteMealsBtn mealApi={ mealApi } />
      <p data-testid="recipe-category">{mealApi?.pstrCategory}</p>
      <h1>Ingredients</h1>
      <div>
        {ingredients.map((value, index) => (
          <h3 key={ index } data-testid={ `${index}-ingredient-step` }>
            <label htmlFor={ index }>
              <input
                id={ index }
                key={ index }
                type="checkbox"
                onChange={ () => recoverRecipe(index) }
                checked={ check.some((che) => che === index) }
              />
              {`${value} - ${measure[index]}`}
            </label>
          </h3>
        ))}
      </div>
      <div>
        <span data-testid="instructions">{mealApi.strInstructions}</span>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !(isDisabled === ingredients?.length
          && ingredients?.length > 0) }
        onClick={ () => {
          console.log('mealApi', mealApi);
          console.log('tags', mealApi.strTags);
          let arrayTags = [];
          if (mealApi.strTags !== null) {
            arrayTags = mealApi.strTags.split(',');
          } else {
            arrayTags = [];
          }
          console.log(arrayTags);
          const getLocal = JSON.parse(localStorage.getItem('doneRecipes')) || [];
          const newLocal2 = {
            id: mealApi.idMeal,
            type: 'food',
            nationality: mealApi.strArea,
            category: mealApi.strCategory,
            alcoholicOrNot: '',
            name: mealApi.strMeal,
            image: mealApi.strMealThumb,
            doneDate: mealApi.dateModified,
            tags: arrayTags,
          };
          const newArray = [...getLocal, newLocal2];
          localStorage.setItem('doneRecipes', JSON.stringify(newArray));
          history.push('/done-recipes');
        } }
      >
        Finish Recipe
      </button>
    </section>
  );
}

export default FoodProgress;
