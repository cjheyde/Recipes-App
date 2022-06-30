import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import CardsMeals from '../components/CardsMeals';
import headerContext from '../MyContext/headerContext';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import '../CSS/FoodsDrinks.css';
import '../CSS/FoodsPage.css';
import fetchAPI from '../services/api';

const cinco = 5;

function Foods() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Foods');
    setSearchBar(false);
    setFoods(true);
  }, [setFoods, setHeaderState, setSearchBar]);

  const { foodCategoryData, setArrayCardsFoods } = useContext(RecipesContext);

  const [catTarget, setCatTarget] = useState('');

  async function onClickFilterFoodCategory(categoryName) {
    if (categoryName !== 'All' && categoryName !== catTarget) {
      const finalData = await fetchAPI(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
      );
      setArrayCardsFoods(finalData.meals);
      setCatTarget(categoryName);
    } else {
      const finalData = await fetchAPI(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      setArrayCardsFoods(finalData.meals);
      setCatTarget('');
    }
  }

  return (
    <>
      <Header />
      <SearchBarHeader />
      <div className="filters">
        { foodCategoryData !== null && foodCategoryData !== undefined
          && foodCategoryData.slice(0, cinco).map((category, index) => (
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
          className="allBtn"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => onClickFilterFoodCategory('All') }
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
