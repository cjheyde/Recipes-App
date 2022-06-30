/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function ShareAndFavotiteDrinksBtn({ drinkApi }) {
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const { pathname } = useLocation();
  const newPath = pathname.split('/in-progress', (1 + 1 + 1));
  const idUrl = useParams();

  console.log(drinkApi);

  const obj = {
    id: drinkApi.idMeal,
    type: 'food',
    nationality: drinkApi.strArea,
    category: drinkApi.strCategory,
    name: drinkApi.strMeal,
    image: drinkApi.strMealThumb,
  };

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const recipeSaved = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const someLocal = recipeSaved.some((item) => item.id === idUrl.id);
    setFavorite(someLocal);
  }, [idUrl.id]);

  const func = () => {
    setFavorite(!favorite);
    const recipeSaved = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipeSaved.some((item) => item.id === idUrl.id)) {
      const filterdLocal = recipeSaved.filter((el) => el.id !== idUrl.id);
      console.log(filterdLocal);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(filterdLocal));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...recipeSaved, obj]));
    }
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

export default ShareAndFavotiteDrinksBtn;
