import React, { useState, useEffect } from 'react';
import '../CSS/ComponentDrink.css';

export default function ComponentDrink() {
  const [drink, setDrink] = useState([]);

  const drinkApi = async () => {
    try {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const { drinks } = await response.json();
      setDrink(drinks);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    drinkApi();
  }, []);

  const n6 = 6;
  return (
    <div className="container">
      { drink.slice(0, n6).map((element, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
          className="card"
        >
          <img src={ element?.strDrinkThumb } alt="bebida recomendada" />
          <p>{ element?.strAlcoholic }</p>
          <h3 data-testid={ `${index}-recomendation-title` }>
            { element?.strDrink }
          </h3>
        </div>
      )) }
    </div>
  );
}
