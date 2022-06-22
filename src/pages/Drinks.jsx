import React from 'react';
import Header from '../components/Header';
import CardsDrink from '../components/CardsDrink';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';

function Drinks() {
  function onClickFilterDrinkCategory() {
    // drinkData.filter((drinkCategory) => drinkCategory);
    console.log('onlcickDrinkCategory');
  }

  return (
    <>
      <Header />
      <SearchBarHeader />
      <div className="Filters">
        <button
          type="button"
          data-testid="button-filter"
          onClick={ onClickFilterDrinkCategory }
        >
          Filtrar
        </button>
      </div>
      <CardsDrink />
      <Footer />
    </>
  );
}

export default Drinks;
