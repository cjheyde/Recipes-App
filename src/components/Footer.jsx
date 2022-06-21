import React from 'react';
import '../CSS/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src="src/images/drinkIcon.svg"
      >
        <img src={ drinkIcon } alt="Bebidas" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        src="src/images/exploreIcon.svg"
      >
        <img src={ exploreIcon } alt="Explorar" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        src="src/images/mealIcon.svg"
      >
        <img src={ mealIcon } alt="Comidas" />
      </button>
    </footer>
  );
}
