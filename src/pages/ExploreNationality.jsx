import React, { useContext, useEffect } from 'react';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import CardsMeals from '../components/CardsMeals';

function ExploreNationality() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);
  const { arrayNationsList } = useContext(RecipesContext);

  useEffect(() => {
    setHeaderState('Explore Nationalities');
    setSearchBar(false);
    setFoods(true);
  }, []);

  return (
    <>
      <Header />
      <div>
        <select
          data-testid="explore-by-nationality-dropdown"
        >
          <option
            data-testid="All-option"
          >
            All
          </option>
          {arrayNationsList && arrayNationsList.map((nation, index) => (
            <option
              data-testid={ `${nation.strArea}-option` }
              key={ index }
              value={ nation.strArea }
            >
              {nation.strArea}
            </option>
          ))}
        </select>
      </div>
      <CardsMeals />
      <Footer />
    </>
  );
}

export default ExploreNationality;
