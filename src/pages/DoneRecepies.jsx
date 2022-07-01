import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import headerContext from '../MyContext/headerContext';
import FoodsDone from '../components/FoodsDone';
import DrinksDone from '../components/DrinksDone';

function DoneRecipes() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Done Recipes');
    setSearchBar(false);
    setFoods(false);
  }, [setHeaderState, setSearchBar, setFoods]);

  const [arrayDone, setArrayDone] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  function getDoneRecipesLStorage() {
    const allDoneRecipes = JSON.parse(localStorage
      .getItem('doneRecipes')) || [];
    setArrayDone(allDoneRecipes);
    // console.log(`all done recipes = ${allDoneRecipes}`);
    setFilteredRecipes(allDoneRecipes);
  }

  useEffect(() => {
    getDoneRecipesLStorage();
  }, []);

  function onlyFoods() {
    const onlyFood = arrayDone.filter((recipe) => recipe.type === 'food');
    setFilteredRecipes(onlyFood);
    // console.log(`only food = ${onlyFood}`);
  }

  function onlyDrinks() {
    const onlyDrink = arrayDone.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(onlyDrink);
    // console.log(`only drink = ${arrayDone}`);
  }

  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ getDoneRecipesLStorage }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ onlyFoods }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ onlyDrinks }
        >
          Drinks
        </button>
      </div>
      { filteredRecipes !== null && filteredRecipes !== undefined
        && filteredRecipes.map((card, index) => (
          (card.type === 'food')
            ? <FoodsDone card={ card } index={ index } />
            : <DrinksDone card={ card } index={ index } />
        ))}
    </>
  );
}

export default DoneRecipes;
