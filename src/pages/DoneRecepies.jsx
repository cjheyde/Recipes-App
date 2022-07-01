import React, { useEffect, useContext, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import RecipesContext from '../MyContext/RecipesContext';
import Header from '../components/Header';
import headerContext from '../MyContext/headerContext';
import shareIcon from '../images/shareIcon.svg';
import FoodsDone from '../components/FoodsDone';
import DrinksDone from '../components/DrinksDone';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Done Recipes');
    setSearchBar(false);
    setFoods(false);
  }, [setHeaderState, setSearchBar, setFoods]);

  // const { id } = useParams();
  const [arrayDone, setArrayDone] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showClipboardsMessage, setShowClipboardMessage] = useState(false);

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
            ? (
              <>
                <FoodsDone card={ card } index={ index } />
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => {
                    setShowClipboardMessage(true);
                    copy(`http://localhost:3000/${card.type}s/${card.id}`);
                  } }
                >
                  <img src={ shareIcon } alt="Compartilhar" />
                </button>
                {showClipboardsMessage && <p>Link copied!</p>}
              </>
            )
            : (
              <>
                <DrinksDone card={ card } index={ index } />
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => {
                    setShowClipboardMessage(true);
                    copy(`${window.location.href}`);
                  } }
                >
                  <img src={ shareIcon } alt="Compartilhar" />
                </button>
                {showClipboardsMessage && <p>Link copied!</p>}
              </>
            )
        ))}
    </>
  );
}

export default DoneRecipes;
