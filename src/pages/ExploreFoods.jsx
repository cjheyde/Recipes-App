import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import RecipesContext from '../MyContext/RecipesContext';

function ExploreFoods() {
  const history = useHistory();
  // const { randomFoodAndDrinks } = useContext(RecipesContext);
  const randomClick = async () => {
    try {
      const urlRandom = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const responseRandom = await fetch(urlRandom);
      const { meals } = await responseRandom.json();
      history.push(`/foods/${meals[0].idMeal}`);
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ randomClick }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
