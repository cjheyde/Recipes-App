import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import CardsMeals from '../components/CardsMeals';
import headerContext from '../MyContext/headerContext';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import '../CSS/FoodsDrinks.css';
import fetchAPI from '../services/api';

const cinco = 5;

function Foods() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Foods');
    setSearchBar(false);
    setFoods(true);
  }, []);

  const { foodCategoryData, setArrayCardsFoods } = useContext(RecipesContext);

  const [toogleYes, setToogleYes] = useState(false);

  async function onClickAll() {
    const finalData = await fetchAPI(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    setArrayCardsFoods(finalData.meals);
  }

  async function onClickFilterFoodCategory(categoryName) {
    const finalData = await fetchAPI(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
    );
    if (toogleYes === false) {
      setArrayCardsFoods(finalData.meals);
      setToogleYes(true);
    } else {
      onClickAll();
      setToogleYes(false);
    }
  }

  // req.30
  // useEffect(() => {
  //   const filteredByText = data.filter((planet) => planet.name.toLowerCase()
  //     .includes(filteredPlanetsByText));

  //   const allFilters = numericFilters.reduce((accumulator, filter) => accumulator
  //     .filter((planet) => {
  //       switch (filter.operador) {
  //       case 'maior que':
  //         return planet[filter.coluna] > Number(filter.value);
  //       case 'menor que':
  //         return planet[filter.coluna] < Number(filter.value);
  //       case 'igual a':
  //         return planet[filter.coluna] === (filter.value);
  //       default:
  //         return true;
  //       }
  //     }), filteredByText);

  //   setFilteredPlanets(allFilters);
  // }, [filteredPlanetsByText, numericFilters, data]);

  return (
    <>
      <Header />
      <SearchBarHeader />
      <div className="Filters">
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
