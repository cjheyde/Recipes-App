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
      .parse(localStorage.getItem('doneRecipes')) || defaultObj;
    console.log('local data', testObj);
    const allDoneRecipes = [testObj];
    setArrayDone(allDoneRecipes[0]);
    console.log(`all done recipes = ${allDoneRecipes[0]}`);
    setFilteredRecipes(allDoneRecipes[0]);
  }

  useEffect(() => {
    getDoneRecipesLStorage();
  }, []);

  function onlyFoods() {
    console.log('arrayDone', arrayDone);
    const onlyFood = arrayDone.filter((recipe) => recipe.type === 'food');
    console.log('foods', onlyFood);
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
      { console.log(filteredRecipes) }
      {filteredRecipes[0] !== 'zero'
      && filteredRecipes.map((receita, indice) => (
        receita.type === 'drink'
          ? (<DrinksDone card={ receita } index={ indice } key={ indice } />)
          : (<FoodsDone card={ receita } index={ indice } key={ indice } />)
      ))}
      {/* {filteredRecipes[0] !== 'zero'
       && filteredRecipes[0].type === 'food'
       && filteredRecipes
         .filter((card, index) => card[index].type === 'food')[0]
         .map((cardItem, cardIndex) => (
           <FoodsDone card={ cardItem } index={ cardIndex } key={ cardIndex } />
         ))} */}
      {/* {filteredRecipes[0] !== 'zero'
      && filteredRecipes[0].type === 'drink'
      && filteredRecipes
        .filter((card, index) => card[index].type === 'drink')[0]
        .map((cardItem, cardIndex) => (
          <DrinksDone card={ cardItem } index={ cardIndex } key={ cardIndex } />
        ))} */}
      {/* { filteredRecipes !== null && filteredRecipes !== undefined
        && filteredRecipes.map((card, index) => (
          (card.type === 'food')
            ? <FoodsDone card={ card } index={ index } />
            : <DrinksDone card={ card } index={ index } />
        ))} */}
    </>
  );
}

export default DoneRecipes;
