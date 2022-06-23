import React, { useContext } from 'react';
import '../CSS/Footer.css';
import { Link } from 'react-router-dom';
import headerContext from '../MyContext/headerContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  const handleDrinks = () => {
    setHeaderState('Drinks');
    setSearchBar(false);
    setFoods(true);
  };

  const handleFoods = () => {
    setHeaderState('Foods');
    setSearchBar(false);
    setFoods(true);
  };

  const handleExplore = () => {
    setHeaderState('Explore');
    setSearchBar(false);
    setFoods(false);
  };

  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <button
          type="button"
          name="Drinks"
          onClick={ handleDrinks }
          src="../images/drinkIcon.svg"
          data-testid="drinks-bottom-btn"
        >
          <img src={ drinkIcon } alt="Bebidas" />
        </button>
      </Link>

      <Link to="/explore">
        <button
          type="button"
          src="../images/exploreIcon.svg"
          onClick={ handleExplore }
          data-testid="explore-bottom-btn"
        >
          <img src={ exploreIcon } alt="Explorar" />
        </button>
      </Link>

      <Link to="/foods">
        <button
          type="button"
          name="Foods"
          src="../images/mealIcon.svg"
          onClick={ handleFoods }
          data-testid="food-bottom-btn"
        >
          <img src={ mealIcon } alt="Comidas" />
        </button>
      </Link>
    </footer>
  );
}
