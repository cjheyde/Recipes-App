<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [foodData, setFoodData] = useState([]);
  const [arrayFoods, setArrayFoods] = useState([]);
  // const [drinkData, setDrinkData] = useState([]);
  const [arrayDrinks, setArrayDrinks] = useState([]);

  async function getFoodCategories() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const finalData = await response.json();
      setFoodData(finalData.strCategory);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getFoodCategories();
  }, []);

  const contextType = {
    arrayFoods,
    setArrayFoods,
    arrayDrinks,
    setArrayDrinks,
    getFoodCategories,
    foodData,
    // drinkData,
  };

  return (
    <RecipesContext.Provider value={ contextType }>
=======
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

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
      history.push(`/cocktails/${cocktailsIngredientApi[0].idDrink}`);
    } else if (radioSelected.radio === 'name' && cocktailsNameApi.length === 1) {
      history.push(`/cocktails/${cocktailsNameApi[0].idDrink}`);
    } else if (radioSelected.radio === 'first-letter'
        && cocktailsFirstLetterApi.length === 1) {
      history.push(`/cocktails/${cocktailsFirstLetterApi[0].idDrink}`);
    }
  };

  const alertEmptyArray = () => {
    console.log(arrayCards.length);
    if (arrayCards === null) {
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
    arrayCards,
    setArrayCards,
    alertEmptyArray,
  };

  return (
    <RecipesContext.Provider value={ context }>
>>>>>>> 7929c3e2e785fec311aca80589d0700b96d7e7ca
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
