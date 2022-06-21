import React from 'react';
import CardsMeals from '../components/CardsMeals';
import SearchBarHeader from '../components/SearchBarHeader';

function MealsPage() {
  return (
    <div>
      <SearchBarHeader />
      <CardsMeals />
    </div>
  );
}

export default MealsPage;
