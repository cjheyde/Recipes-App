import React, { useContext } from 'react';
import Header from '../components/Header';
import CardsMeals from '../components/CardsMeals';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';

function Foods() {
  const {
    foodData,
  } = useContext(RecipesContext);

  function onClickFilterFoodCategory() {
    foodData.filter((foodCategory) => foodCategory);
  }

  return (
    <>
      <Header />
      <SearchBarHeader />
      <CardsMeals />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClickFilterFoodCategory }
      >
        Filtrar
      </button>
      <Footer />
    </>
  );
}

export default Foods;
