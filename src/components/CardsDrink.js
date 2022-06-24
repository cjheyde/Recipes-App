import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../MyContext/RecipesContext';

const doze = 12;

function CardsDrink() {
  const { arrayCardsDrinks } = useContext(RecipesContext);

  const history = useHistory();

  return (
    <div>
      { arrayCardsDrinks !== null && arrayCardsDrinks !== undefined
      && arrayCardsDrinks.slice(0, doze).map((card, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <button type="button" onClick={ () => history.push(`/drinks/${card.idDrink}`) }>
            <img
              data-testid={ `${index}-card-img` }
              src={ card.strDrinkThumb }
              alt="thumb"
            />
            <p data-testid={ `${index}-card-name` }>
              {card.strDrink}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
}

export default CardsDrink;
