import React from 'react';
import Header from '../components/Header';
import CardsMeals from '../components/CardsMeals';
import SearchBarHeader from '../components/SearchBarHeader';
import Footer from '../components/Footer';

function Foods() {
  return (
    <>
      <Header />
      <SearchBarHeader />
      <CardsMeals />
      <Footer />
    </>
  );
}

export default Foods;
