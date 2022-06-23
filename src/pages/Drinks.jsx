import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import CardsDrink from '../components/CardsDrink';
import SearchBarHeader from '../components/SearchBarHeader';
import headerContext from '../MyContext/headerContext';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';

const cinco = 5;

function Drinks() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Drinks');
    setSearchBar(false);
    setFoods(true);
  }, []);

  const {
    drinkCategoryData,
  } = useContext(RecipesContext);

  let { newDrinkCategoryData } = [];
  if (drinkCategoryData.length > cinco) {
    newDrinkCategoryData = drinkCategoryData.slice(0, cinco);
  } else {
    newDrinkCategoryData = drinkCategoryData;
  }

  return (
    <>
      <Header />
      <SearchBarHeader />
      <div className="Filters">
        { newDrinkCategoryData !== undefined
          && newDrinkCategoryData.map((category, index) => (
            <div key={ index }>
              <button
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                // onClick={ onClickFilterDrinkCategory }
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
