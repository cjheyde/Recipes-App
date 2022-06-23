import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';
import fetchAPI from '../services/api';

const doze = 12;

function ExploreFoodIng() {
  const {
    explFoodIngred, setExplFoodIngred, setArrayCards,
  } = useContext(RecipesContext);

  if (explFoodIngred !== null && explFoodIngred !== undefined
    && explFoodIngred.length > doze) {
    const newExplFoodIngred = explFoodIngred.slice(0, doze);
    setExplFoodIngred(newExplFoodIngred);
  }

  const history = useHistory();

  async function ingredientClick(ingredientName) {
    const newData = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    console.log(ingredientName);
    setArrayCards(newData.meals);
    history.push('/foods');
  }

  return (
    <>
      <Header />
      <div>
        { explFoodIngred !== null && explFoodIngred !== undefined
          && explFoodIngred.map((ingredient, index) => (
            <div
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <button
                type="button"
                onClick={ () => ingredientClick(ingredient.strIngredient) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                  alt="thumb"
                />
                <p data-testid={ `${index}-card-name` }>
                  { ingredient.strIngredient }
                </p>
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodIng;
