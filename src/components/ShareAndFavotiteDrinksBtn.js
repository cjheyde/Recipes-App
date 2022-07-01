import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../CSS/ShareAndFavorite.css';

const copy = require('clipboard-copy');

function ShareAndFavotiteDrinksBtn({ drinkApi }) {
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const { pathname } = useLocation();
  const newPath = pathname.split('/in-progress', (1 + 1 + 1));
  const idUrl = useParams();

  const obj = {
    id: drinkApi.idDrink,
    type: 'drink',
    nationality: '',
    category: drinkApi.strCategory,
    alcoholicOrNot: drinkApi.strAlcoholic,
    name: drinkApi.strDrink,
    image: drinkApi.strDrinkThumb,
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
        className="shareIcon"
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ () => copy(`http://localhost:3000${newPath[0]}`) && func2() }
      >
        <img src={ shareIcon } alt={ shareIcon } />
      </button>
      <button
        className="favorite"
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

ShareAndFavotiteDrinksBtn.propTypes = {
  drinkApi: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShareAndFavotiteDrinksBtn;
