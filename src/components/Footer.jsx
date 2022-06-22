import React from 'react';
import '../CSS/Footer.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <Link to="/drinks">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src="src/images/drinkIcon.svg"
        >
          <img src={ drinkIcon } alt="Bebidas" />
        </button>
      </Link>
      <Link to="/explore">
        <button
          type="button"
          data-testid="explore-bottom-btn"
          src="src/images/exploreIcon.svg"
        >
          <img src={ exploreIcon } alt="Explorar" />
        </button>
      </Link>
      <Link to="/foods">
        <button
          type="button"
          data-testid="food-bottom-btn"
          src="src/images/mealIcon.svg"
        >
          <img src={ mealIcon } alt="Comidas" />
        </button>
      </Link>
    </footer>
  );
}
