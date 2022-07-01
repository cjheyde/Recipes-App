import React from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function FoodsDone({ card, index }) {
  // const history = useHistory();
  console.log(`card id = ${card[index].id}`);
  console.log(`card type = ${card[index].type}`);

  return (
    <div
      className="ingredients"
      data-testid={ `${index}-recipe-card` }
      key={ index }
    >
      <button
        type="button"
        // onClick={ history.push(`/foods/${card.id}`) }
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
        className="cardCategory"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {card.category}
      </p>
      <p
        className="cardNationality"
        data-testid={ `${index}-${card.nationality}-horizontal-tag` }
      >
        {card[index].nationality}
      </p>
      <p
        className="cardDate"
        data-testid={ `${index}-horizontal-done-date` }
      >
        {card[index].doneDate}
      </p>
      <p
        className="cardTag1Api"
        data-testid={ `${index}-${card[index].tag[0]}-horizontal-tag` }
      >
        {card[index].tag[0]}
      </p>
      <p
        className="cardTag2Api"
        data-testid={ `${index}-${card.tag[1]}-horizontal-tag` }
      >
        {card[index].tag[1]}
      </p>
    </div>
  );
}

FoodsDone.propTypes = {
  card: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  index: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
}.isRequired;

export default FoodsDone;
