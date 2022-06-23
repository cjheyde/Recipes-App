import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';

const doze = 12;

function ExploreFoodIng() {
  const { explFoodIngred, setExplFoodIngred } = useContext(RecipesContext);

  if (explFoodIngred !== null && explFoodIngred !== undefined
    && explFoodIngred.length > doze) {
    const newExplFoodIngred = explFoodIngred.slice(0, doze);
    setExplFoodIngred(newExplFoodIngred);
  }
  console.log(explFoodIngred);

  const history = useHistory();

  function ingredientClick(ingredient) {
    history.push('/foods');
    // filtrar na tela foods as receitas que contém o ingrediente escolhido
    console.log(ingredient);
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
              <button type="button" onClick={ () => ingredientClick(ingredient) }>
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
