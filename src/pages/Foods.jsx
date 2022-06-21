// import React, { useContext } from 'react';
import React from 'react';
import Header from '../components/Header';
import CardsMeals from '../components/CardsMeals';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';
// import RecipesContext from '../MyContext/RecipesContext';
import '../CSS/Foods.css';

function Foods() {
  // const {
  //   foodData,
  // } = useContext(RecipesContext);

  function onClickFilterFoodCategory() {
    // foodData.filter((foodCategory) => foodCategory);
    console.log('onlcickFoodCategory');
  }

  return (
    <>
      <Header />
      <SearchBarHeader />
      <div className="Filters">
        <button
          type="button"
          data-testid="button-filter"
          onClick={ onClickFilterFoodCategory }
        >
          Filtrar
        </button>
      </div>
      <CardsMeals />
      <Footer />
    </>
  );
}

export default Foods;
