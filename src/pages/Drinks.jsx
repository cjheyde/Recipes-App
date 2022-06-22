import React from 'react';
import Header from '../components/Header';
import SearchBarHeader from '../components/SearchBarHeader';
import CardsDrink from '../components/CardsDrink';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <>
      <Header />
      <SearchBarHeader />
      <CardsDrink />
      <Footer />
    </>
  );
}

export default Drinks;
