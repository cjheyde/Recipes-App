import React from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function DrinksDone({ card, index }) {
  // const history = useHistory();
  console.log(card[index].type, card[index].id);

  return (
    <div
      className="ingredients"
      data-testid={ `${index}-recipe-card` }
      key={ index }
    >
      <button
        type="button"
        // onClick={ history.push(`/drinks/${card.id}`) }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ card[index].image }
          alt="thumb"
        />
        <p
          className="cardName"
          data-testid={ `${index}-horizontal-name` }
        >
          {card[index].name}
        </p>
      </button>
      <p
        className="cardAlcolica"
        data-testid={ `${index}-${card.alcoholicOrNot}-horizontal-tag` }
      >
        {card[index].alcoholicOrNot}
      </p>
      <p
        className="cardDate"
        data-testid={ `${index}-horizontal-done-date` }
      >
        {card[index].doneDate}
      </p>
    </div>
  );
}

DrinksDone.propTypes = {
  card: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinksDone;
