import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../MyContext/RecipesContext';

const doze = 12;

function CardsDrink() {
  const { arrayDrinks } = useContext(RecipesContext);
  let { newArrayDrinks } = [];
  if (arrayDrinks.length > doze) {
    newArrayDrinks = arrayDrinks.slice(0, doze);
  } else {
    newArrayDrinks = arrayDrinks;
  }
  // console.log(newArrayDrinks);
  const history = useHistory();

  function cardClick(card) {
    history.push(`/drinks/${card.idDrink}`);
  }

  return (
    <div>
      {newArrayDrinks !== undefined && newArrayDrinks.map((card, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <button type="button" onClick={ () => cardClick(card) }>
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
