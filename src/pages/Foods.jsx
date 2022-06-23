import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import CardsMeals from '../components/CardsMeals';
import headerContext from '../MyContext/headerContext';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import '../CSS/Foods.css';
import fetchAPI from '../services/api';

const cinco = 5;

function Foods() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  const {
    foodCategoryData, setFoodCategoryData,
  } = useContext(RecipesContext);

  useEffect(() => {
    setHeaderState('Foods');
    setSearchBar(false);
    setFoods(true);
  }, []);

  if (foodCategoryData !== null && foodCategoryData !== undefined
    && foodCategoryData.length > cinco) {
    const newFoodCategoryData = foodCategoryData.slice(0, cinco);
    setFoodCategoryData(newFoodCategoryData);
  }

  async function onClickFilterFoodCategory(category) {
    const finalData = await fetchAPI(
      `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    console.log(finalData);
  }

  function onClickAll() {

  }

  return (
    <>
      <Header />
      <SearchBarHeader />
      <div className="Filters">
        { foodCategoryData !== undefined
          && foodCategoryData.map((category, index) => (
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
        <button
          type="button"
          data-testid="All-category-filter"
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
