import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <>
      <Header />
      <Link to="/explore/foods">
        <button
          type="button"
          data-testid="explore-foods"
          src="src/images/drinkIcon.svg"
        >
          Explore Foods
        </button>
      </Link>
      <Link to="/explore/drinks">
        <button
          type="button"
          data-testid="explore-drinks"
          src="src/images/drinkIcon.svg"
        >
          Explore Drinks
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Explore;
