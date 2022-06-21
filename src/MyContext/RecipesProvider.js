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
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
