import React, { useContext } from 'react';
import Header from '../components/Header';
import CardsDrink from '../components/CardsDrink';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';

const cinco = 5;

function Drinks() {
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
                onClick={ onClickFilterDrinkCategory }
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
