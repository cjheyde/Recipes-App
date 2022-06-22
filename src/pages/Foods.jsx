import React, { useContext } from 'react';
import Header from '../components/Header';
import CardsMeals from '../components/CardsMeals';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import '../CSS/Foods.css';
import fetchAPI from '../services/api';

const cinco = 5;

function Foods() {
  const {
    foodCategoryData,
  } = useContext(RecipesContext);

  let { newFoodCategoryData } = [];
  if (foodCategoryData.length > cinco) {
    newFoodCategoryData = foodCategoryData.slice(0, cinco);
  } else {
    newFoodCategoryData = foodCategoryData;
  }

  async function onClickFilterFoodCategory(category) {
    const finalData = await fetchAPI(
      `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    // newFoodCategoryData = finalData.meals;
    console.log(finalData);
  }

  return (
    <>
      <Header />
      <SearchBarHeader />
      <div className="Filters">
        { newFoodCategoryData !== undefined
          && newFoodCategoryData.map((category, index) => (
            <div key={ index }>
              <button
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ () => onClickFilterFoodCategory(category.strCategory) }
              >
                { category.strCategory }
              </button>
            </div>
          ))}
      </div>
      <CardsMeals />
      <Footer />
    </>
  );
}

export default Foods;
