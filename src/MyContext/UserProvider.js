import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import UserContext from './UserContext';

function UserProvider({ children }) {
  const [mealIngredientApi, setMealIngredientApi] = useState([]);
  const [mealNameApi, setMealNameApi] = useState([]);
  const [mealFirstLetterApi, setMealFirstLetterApi] = useState([]);
  const [cocktailsIngredientApi, setCocktailsIngredientApi] = useState([]);
  const [cocktailsNameApi, setCocktailsNameApi] = useState([]);
  const [cocktailsFirstLetterApi, setCocktailsFirstLetterApi] = useState([]);
  const [radioSelected, setRadioSelected] = useState({
    radio: '',
  });

  useEffect(() => {
    const fetchMealsIngredientData = async () => {
      try {
        const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=rice';
        const response = await fetch(url);
        const data = await response.json();
        setMealIngredientApi(data);
      } catch (error) {
        return error;
      }
    };
    fetchMealsIngredientData();

    const fetchMealsNameData = async () => {
      try {
        const urlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
        const responseName = await fetch(urlName);
        const dataName = await responseName.json();
        setMealNameApi(dataName);
      } catch (error) {
        return error;
      }
    };
    fetchMealsNameData();

    const fetchMealsFirstLetter = async () => {
      try {
        const urlFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
        const responseFirstLetter = await fetch(urlFirstLetter);
        const dataFirstLetter = await responseFirstLetter.json();
        setMealFirstLetterApi(dataFirstLetter);
      } catch (error) {
        return error;
      }
    };
    fetchMealsFirstLetter();
  }, []);

  useEffect(() => {
    const fetchCocktailsIngredientData = async () => {
      try {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=fruit';
        const response = await fetch(url);
        const data = await response.json();
        setCocktailsIngredientApi(data);
      } catch (error) {
        return error;
      }
    };
    fetchCocktailsIngredientData();

    const fetchCocktailsNameData = async () => {
      try {
        const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
        const responseName = await fetch(urlName);
        const dataName = await responseName.json();
        setCocktailsNameApi(dataName);
      } catch (error) {
        return error;
      }
    };
    fetchCocktailsNameData();

    const fetchCocktailsFirstLetter = async () => {
      try {
        const urlFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
        const responseFirstLetter = await fetch(urlFirstLetter);
        const dataFirstLetter = await responseFirstLetter.json();
        setCocktailsFirstLetterApi(dataFirstLetter);
      } catch (error) {
        return error;
      }
    };
    fetchCocktailsFirstLetter();
  }, []);

  const context = {
    mealIngredientApi,
    mealNameApi,
    mealFirstLetterApi,
    radioSelected,
    setRadioSelected,
    cocktailsIngredientApi,
    cocktailsNameApi,
    cocktailsFirstLetterApi,
  };

  return (
    <UserContext.Provider value={ context }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
