import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import CardsDrink from '../components/CardsDrink';
import SearchBarHeader from '../components/SearchBarHeader';
import headerContext from '../MyContext/headerContext';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import fetchAPI from '../services/api';

const cinco = 5;

function Drinks() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Drinks');
    setSearchBar(false);
    setFoods(true);
  }, []);

  const {
    drinkCategoryData, setArrayCardsDrinks,
  } = useContext(RecipesContext);

  async function onClickFilterDrinkCategory(categoryName) {
    const finalData = await fetchAPI(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`,
    );
    setArrayCardsDrinks(finalData.drinks);
  }

  async function onClickAll() {
    const finalData = await fetchAPI(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
    setArrayCardsDrinks(finalData.drinks);
  }

  return (
    <>
      <Header />
      <SearchBarHeader />
      <div className="Filters">
        { drinkCategoryData !== null && drinkCategoryData !== undefined
          && drinkCategoryData.slice(0, cinco).map((category, index) => (
            <div key={ index }>
              <button
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ () => onClickFilterDrinkCategory(category.strCategory) }
              >
                { category.strCategory }
              </button>
            </div>
          ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => onClickAll() }
        >
          All
        </button>
      </div>
      <CardsDrink />
      <Footer />
    </>
  );
}
export default Drinks;
