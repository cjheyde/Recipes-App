import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  const handleExploreFoods = () => {
    setHeaderState('Explore Foods');
    setSearchBar(false);
    setFoods(false);
  };

  const handleExploreDrinks = () => {
    setHeaderState('Explore Drinks');
    setSearchBar(false);
    setFoods(false);
  };

  return (
    <>
      <Header />
      <Link to="/explore/foods">
        <button
          type="button"
          onClick={ handleExploreFoods }
          src="src/images/drinkIcon.svg"
          data-testid="explore-foods"
        >
          Explore Foods
        </button>
      </Link>
      <Link to="/explore/drinks">
        <button
          type="button"
          onClick={ handleExploreDrinks }
          src="src/images/drinkIcon.svg"
          data-testid="explore-drinks"
        >
          Explore Drinks
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Explore;
