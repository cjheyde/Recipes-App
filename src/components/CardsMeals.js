import React, { useContext } from 'react';
import RecipesContext from '../MyContext/RecipesContext';
import '../CSS/CardMeals.css';

const doze = 12;

function CardsMeals() {
  const { arrayCards, setArrayCards } = useContext(RecipesContext);
  if (arrayCards !== undefined && arrayCards.length > doze) {
    const newArrayCards = arrayCards.slice(0, doze);
    setArrayCards(newArrayCards);
  }

  return (
    <div>
      { arrayCards !== undefined && arrayCards.map((card, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ card.strMealThumb }
            alt="thumb"
          />
          <p data-testid={ `${index}-card-name` }>
            {card.strMeal}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CardsMeals;
