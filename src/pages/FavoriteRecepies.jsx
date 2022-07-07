import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import headerContext from '../MyContext/headerContext';
import FoodsFavorite from '../components/FoodsFavorite';
import DrinksFavorite from '../components/DrinksFavorite';
import RecipesContext from '../MyContext/RecipesContext';

function FavoriteRecipes() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);
  const { reload } = useContext(RecipesContext);

  useEffect(() => {
    setHeaderState('Favorite Recipes');
    setSearchBar(false);
    setFoods(false);
  }, [setHeaderState, setSearchBar, setFoods]);

  const [arrayDone, setArrayDone] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(['zero']);

  const defaultObj = [{
    id: 'default',
    type: 'default',
    nationality: 'default',
    category: 'default',
    alcoholicOrNot: 'default',
    name: 'default',
    image: 'default',
    tags: ['default', 'default 01'],
  }];

  function getDoneRecipesLStorage() {
    // const allDoneRecipes = JSON.parse(localStorage
    //   .getItem('favoriteRecipes')) || [defaultObj];
    const testObj = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || defaultObj;
    console.log('local data', testObj);
    const allDoneRecipes = [testObj];
    setArrayDone(allDoneRecipes[0]);
    console.log(`all done recipes = ${allDoneRecipes[0]}`);
    setFilteredRecipes(allDoneRecipes[0]);
  }

  useEffect(() => {
    getDoneRecipesLStorage();
  }, []);

  useEffect(() => {
    console.log('Valor de Reload', reload);
    getDoneRecipesLStorage();
  }, [reload]);

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
      {console.log('filtered', filteredRecipes)}
      {console.log(filteredRecipes)}
      {filteredRecipes[0] !== 'zero'
        && filteredRecipes.map((receita, indice) => (
          receita.type === 'drink'
            ? (<DrinksFavorite card={ receita } index={ indice } key={ indice } />)
            : (<FoodsFavorite card={ receita } index={ indice } key={ indice } />)
        ))}
      {/* // .map((newCard, newIndex) => (
        //   <div key={ newIndex }>
        //       {console.log('card', newCard)}
        //       {console.log('index', newIndex)}
        //       <FoodsFavorite card={ newCard } index={ newIndex } />
        //     </div>
        // )) */}
    </>
  );
}

export default FavoriteRecipes;
