import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import fetchAPI from '../services/api';

function RecipesProvider({ children }) {
  const history = useHistory();
  const [mealIngredientApi, setMealIngredientApi] = useState([]);
  const [mealNameApi, setMealNameApi] = useState([]);
  const [mealFirstLetterApi, setMealFirstLetterApi] = useState([]);
  const [cocktailsIngredientApi, setCocktailsIngredientApi] = useState([]);
  const [cocktailsNameApi, setCocktailsNameApi] = useState([]);
  const [cocktailsFirstLetterApi, setCocktailsFirstLetterApi] = useState([]);
  const [radioSelected, setRadioSelected] = useState({
    radio: '',
  });
  const [arrayCards, setArrayCards] = useState([]);
  const [foodCategoryData, setFoodCategoryData] = useState([]);
  const [arrayFoods, setArrayFoods] = useState([]);
  const [drinkCategoryData, setDrinkCategoryData] = useState([]);
  const [arrayDrinks, setArrayDrinks] = useState([]);

  async function fetchFoods() {
    const finalData = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setArrayFoods(finalData.meals);
  }

  async function fetchDrinks() {
    const finalData = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setArrayDrinks(finalData.drinks);
  }

  async function fetchFoodCategories() {
    const finalData = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    setFoodCategoryData(finalData.meals);
  }

  async function fetchDrinkCategories() {
    const finalData = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    setDrinkCategoryData(finalData.drinks);
  }

  useEffect(() => {
    fetchFoods();
    fetchDrinks();
    fetchFoodCategories();
    fetchDrinkCategories();
  }, []);

  useEffect(() => {
    const fetchMealsIngredientData = async () => {
      try {
        const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}';
        const response = await fetch(url);
        const { meals } = await response.json();
        setMealIngredientApi(meals);
      } catch (error) {
        return error;
      }
    };
    fetchMealsIngredientData();

    const fetchMealsNameData = async () => {
      try {
        const urlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
        const responseName = await fetch(urlName);
        const { meals } = await responseName.json();
        setMealNameApi(meals);
      } catch (error) {
        return error;
      }
    };
    fetchMealsNameData();

    const fetchMealsFirstLetter = async () => {
      try {
        const urlFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
        const responseFirstLetter = await fetch(urlFirstLetter);
        const { meals } = await responseFirstLetter.json();
        setMealFirstLetterApi(meals);
      } catch (error) {
        return error;
      }
    };
    fetchMealsFirstLetter();
  }, []);

  useEffect(() => {
    const fetchCocktailsIngredientData = async () => {
      try {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=rice';
        const response = await fetch(url);
        const { drinks } = await response.json();
        setCocktailsIngredientApi(drinks);
      } catch (error) {
        return error;
      }
    };
    fetchCocktailsIngredientData();

    const fetchCocktailsNameData = async () => {
      try {
        const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
        const responseName = await fetch(urlName);
        const { drinks } = await responseName.json();
        setCocktailsNameApi(drinks);
      } catch (error) {
        return error;
      }
    };
    fetchCocktailsNameData();

    const fetchCocktailsFirstLetter = async () => {
      try {
        const urlFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
        const responseFirstLetter = await fetch(urlFirstLetter);
        const { drinks } = await responseFirstLetter.json();
        setCocktailsFirstLetterApi(drinks);
      } catch (error) {
        return error;
      }
    };
    fetchCocktailsFirstLetter();
  }, []);

  const searchBtnMeals = () => {
    if (radioSelected.radio === 'ingredient' && mealIngredientApi.length === 1) {
      history.push(`/foods/${mealIngredientApi[0].idMeal}`);
    } else if (radioSelected.radio === 'name' && mealNameApi.length === 1) {
      history.push(`/foods/${mealNameApi[0].idMeal}`);
    } else if (radioSelected.radio === 'first-letter'
      && mealFirstLetterApi.length === 1) {
      history.push(`/foods/${mealFirstLetterApi[0].idMeal}`);
    }
  };

  const searchBtnCocktailsDrinks = () => {
    if (radioSelected.radio === 'ingredient' && cocktailsIngredientApi.length === 1) {
      history.push(`/driks/${cocktailsIngredientApi[0].idDrink}`);
    } else if (radioSelected.radio === 'name' && cocktailsNameApi.length === 1) {
      history.push(`/driks/${cocktailsNameApi[0].idDrink}`);
    } else if (radioSelected.radio === 'first-letter'
      && cocktailsFirstLetterApi.length === 1) {
      history.push(`/driks/${cocktailsFirstLetterApi[0].idDrink}`);
    }
  };

  const alertEmptyArray = () => {
    console.log(arrayFoods.length);
    if (arrayFoods === null) {
      global.alert('Sorry, we haven"t found any recipes for these filters.');
    }
  };

  const context = {
    mealIngredientApi,
    mealNameApi,
    mealFirstLetterApi,
    radioSelected,
    setRadioSelected,
    cocktailsIngredientApi,
    cocktailsNameApi,
    cocktailsFirstLetterApi,
    searchBtnMeals,
    searchBtnCocktailsDrinks,
    alertEmptyArray,
    arrayFoods,
    setArrayFoods,
    arrayDrinks,
    setArrayDrinks,
    arrayCards,
    setArrayCards,
    foodCategoryData,
    setFoodCategoryData,
    drinkCategoryData,
    setDrinkCategoryData,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
