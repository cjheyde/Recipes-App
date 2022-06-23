import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../MyContext/RecipesContext';

const doze = 12;

function ExploreDrinkIng() {
  const { explDrinkIngred, setExplDrinkIngred } = useContext(RecipesContext);

  if (explDrinkIngred !== null && explDrinkIngred !== undefined
    && explDrinkIngred.length > doze) {
    const newExplDrinkIngred = explDrinkIngred.slice(0, doze);
    setExplDrinkIngred(newExplDrinkIngred);
  }
  console.log(explDrinkIngred);

  const history = useHistory();

  function ingredientClick(ingredient) {
    history.push('/drinks');
    // filtrar na tela drinks as receitas que contém o ingrediente escolhido
    console.log(ingredient);
  }

  return (
    <>
      <Header />
      <div>
        { explDrinkIngred !== null && explDrinkIngred !== undefined
          && explDrinkIngred.map((ingredient, index) => (
            <div
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <button type="button" onClick={ () => ingredientClick(ingredient) }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                  alt="thumb"
                />
                <p data-testid={ `${index}-card-name` }>
                  { ingredient.strIngredient1 }
                </p>
              </button>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinkIng;
