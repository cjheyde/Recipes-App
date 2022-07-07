// import React from 'react';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../MyContext/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodsFavorite({ card, index }) {
  const history = useHistory();
  const [showClipboardsMessage, setShowClipboardMessage] = useState(false);
  const { reload, setReload } = useContext(RecipesContext);

  return (
    // <div>
    //   { console.log('Hello', card, index)}
    //   <p>{card.id}</p>
    // </div>
    <div
      className="ingredients"
      data-testid={ `${index}-recipe-card` }
      key={ index }
    >
      <button
        type="button"
        onClick={ () => history.push(`/foods/${card.id}`) }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ card.image }
          alt="thumb"
        />
        <div
          className="cardCategory"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {card.nationality}
          { ' - ' }
          {card.category}
        </div>
        <div
          className="cardName"
          data-testid={ `${index}-horizontal-name` }
        >
          {card.name}
        </div>
        <div
          className="cardDate"
          data-testid={ `${index}-horizontal-done-date` }
        >
          { `Done in: ${card.doneDate}` }
        </div>
        {/* <div>
          <span
            className="cardTag1Api"
            data-testid={ `${index}-${card.tags[0]}-horizontal-tag` }
          >
            {card.tags[0]}
          </span>
          { ' ' }
          <span
            className="cardTag2Api"
            data-testid={ `${index}-${card.tags[1]}-horizontal-tag` }
          >
            {card.tags[1]}
          </span>
        </div> */}
      </button>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ () => {
          setShowClipboardMessage(true);
          copy(`http://localhost:3000/${card.type}s/${card.id}`);
        } }
      >
        <img src={ shareIcon } alt="Compartilhar" />
      </button>
      {showClipboardsMessage && <p>Link copied!</p>}
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        onClick={ () => {
          const oldFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
          console.log(oldFavorites);
          const newFavorites = oldFavorites.filter((recipe) => recipe.id !== card.id);
          console.log(newFavorites);
          localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
          setReload(!reload);
        } }
      >
        <img src={ blackHeartIcon } alt="Favoritar" />
      </button>
    </div>
  );
}

FoodsFavorite.propTypes = {
  card: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  index: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
}.isRequired;

export default FoodsFavorite;
