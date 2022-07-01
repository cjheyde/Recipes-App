import React from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function FoodsDone({ card, index }) {
  // const history = useHistory();
  // console.log(`card id = ${card.id}`);
  // console.log(`card type = ${card.type}`);

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
          src={ card.image }
          alt="thumb"
        />
        <p
          className="cardName"
          data-testid={ `${index}-horizontal-name` }
        >
          {card.name}
        </p>
      </button>
      <p
        className="cardCategory"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {card.nationality}
        { ' - ' }
        {card.category}
      </p>
      {/* <p
        className="cardNationality"
        data-testid={ `${index}-${card.nationality}-horizontal-tag` }
      >
        {card.nationality}
      </p> */}
      <p
        className="cardDate"
        data-testid={ `${index}-horizontal-done-date` }
      >
        {card.doneDate}
      </p>
      <p
        className="cardTag1Api"
        data-testid={ `${index}-${card.tags[0]}-horizontal-tag` }
      >
        {card.tags[0]}
      </p>
      <p
        className="cardTag2Api"
        data-testid={ `${index}-${card.tags[1]}-horizontal-tag` }
      >
        {card.tags[1]}
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
