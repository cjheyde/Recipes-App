import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import CardsMeals from '../components/CardsMeals';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import '../CSS/Foods.css';
import fetchAPI from '../services/api';

const cinco = 5;

function Foods() {
  const [isfiltered, setIsfiltered] = useState(false);
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
    setIsfiltered(true);
  }

  function onClickAll() {

  }

  return (
    <>
      <Header />
      <SearchBarHeader />
      <div className="Filters">
        { (newFoodCategoryData !== undefined && isfiltered === false)
          && newFoodCategoryData.map((category, index) => (
            <div key={ index }>
              <button
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                isfiltered={ isfiltered }
                onClick={ () => onClickFilterFoodCategory(category.strCategory) }
              >
                { category.strCategory }
              </button>
            </div>
          ))}
        <button
          type="button"
          data-testid="All-category-filter"
          // isfiltered={ isfiltered }
          onClick={ () => onClickAll() }
        >
          All
        </button>
      </div>
      <CardsMeals />
      <Footer />
    </>
  );
}

export default Foods;
