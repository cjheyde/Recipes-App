import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../MyContext/RecipesContext';
import '../CSS/CardMeals.css';

const doze = 12;

function CardsMeals() {
  const { arrayFoods } = useContext(RecipesContext);
  let { newArrayFood } = [];
  if (arrayFoods.length > doze) {
    newArrayFood = arrayFoods.slice(0, doze);
  } else {
    newArrayFood = arrayFoods;
  }
  // console.log(newArrayFood);
  const history = useHistory();

  function cardClick(card) {
    history.push(`/foods/${card.idMeal}`);
  }
  return (
    <div>
      { newArrayFood !== undefined && newArrayFood.map((card, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <button type="button" onClick={ () => cardClick(card) }>
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
