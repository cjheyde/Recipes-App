import React from 'react';
import Header from '../components/Header';
import CardsMeals from '../components/CardsMeals';
import SearchBarHeader from '../components/SearchBarHeader';

function Foods() {
  return (
    <>
      <Header />
      <SearchBarHeader />
      <CardsMeals />
    </>
  );
}

export default Foods;
