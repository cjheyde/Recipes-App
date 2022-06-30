import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function ShareAndFavotiteMealsBtn({ mealApi }) {
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const { pathname } = useLocation();
  const newPath = pathname.split('/in-progress', (1 + 1 + 1));
  const idUrl = useParams();

  const obj = {
    id: mealApi.idMeal,
    type: 'food',
    nationality: mealApi.strArea,
    category: mealApi.strCategory,
    alcoholicOrNot: '',
    name: mealApi.strMeal,
    image: mealApi.strMealThumb,
  };

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const recipeSaved = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(recipeSaved);
    const someLocal = recipeSaved.some((item) => item.id === idUrl.id);
    setFavorite(someLocal);
  }, [idUrl.id]);

  const func = () => {
    setFavorite(!favorite);
    const recipeSaved = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipeSaved.some((item) => item.id === idUrl.id)) {
      const filterdLocal = recipeSaved.filter((el) => el.id !== idUrl.id);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(filterdLocal));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...recipeSaved, obj]));
    }
    console.log(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const func2 = () => {
    setCopied(!copied);
  };

  return (
    <>
      { copied && <p>Link copied!</p>}
      <button
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ () => copy(`http://localhost:3000${newPath[0]}`) && func2() }
      >
        <img src={ shareIcon } alt={ shareIcon } />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ favorite ? blackHeartIcon : favoriteIcon }
        onClick={ func }
      >
        <img src={ favorite ? blackHeartIcon : favoriteIcon } alt={ favoriteIcon } />
      </button>
    </>
  );
}

ShareAndFavotiteMealsBtn.propTypes = {
  mealApi: PropTypes.shape({
    idMeal: PropTypes.number.isRequired,
    strArea: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShareAndFavotiteMealsBtn;
