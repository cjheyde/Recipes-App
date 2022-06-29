import React, { useState, useEffect } from 'react';
import '../CSS/ComponentFood.css';

export default function ComponentFood() {
  const [food, setFood] = useState([]);

  const foodApi = async () => {
    try {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const { meals } = await response.json();
      setFood(meals);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    foodApi();
  }, []);

  const n6 = 6;
  return (
    <div className="container">
      { food.slice(0, n6).map((element, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
          className="card"
        >
          <img src={ element?.strMealThumb } alt="comida recomendada" />
          <p>{ element?.strCategory }</p>
          <h3 data-testid={ `${index}-recomendation-title` }>
            { element?.strMeal }
          </h3>
        </div>
      )) }
    </div>
  );
}
