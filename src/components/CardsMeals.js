import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../MyContext/RecipesContext';
import '../CSS/CardMeals.css';

const doze = 12;

function CardsMeals() {
  const { arrayCards } = useContext(RecipesContext);

  const history = useHistory();
  return (
    <div>
      { arrayCards !== null && arrayCards
      !== undefined && arrayCards.slice(0, doze).map((card, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <button
            data-testid={ `${index}-card-img` }
            type="button"
            onClick={ () => history.push(`/foods/${card.idMeal}`) }
            src={ card.strMealThumb }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ card.strMealThumb }
              alt="thumb"
            />
            <p
              className="cardName"
              data-testid={ `${index}-card-name` }
            >
              {card.strMeal}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
}

export default CardsMeals;
