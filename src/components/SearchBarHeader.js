import React, { useContext } from 'react';
import UserContext from '../MyContext/UserContext';

function SearchBarHeader() {
  const { radioSelected, setRadioSelected, ingredientApi,
    nameApi, firstLetterApi } = useContext(UserContext);
  const { radio } = radioSelected;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRadioSelected({
      [name]: value,
    });
  };

  const searchBtn = () => {
    if (radio === 'ingredient') {
      return ingredientApi;
    } if (radio === 'name') {
      return nameApi;
    }
    return firstLetterApi;
  };

  return (
    <div>
      <label htmlFor="ingredients">
        <input
          id="ingredients"
          type="radio"
          name="radio"
          value="ingredient"
          checked={ radio === 'ingredient' }
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
        Ingredient
      </label>
      <label htmlFor="nome">
        <input
          id="nome"
          type="radio"
          name="radio"
          value="name"
          checked={ radio === 'name' }
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
        Name
      </label>
      <label htmlFor="first">
        <input
          id="first"
          type="radio"
          name="radio"
          value="first-letter"
          checked={ radio === 'first-letter' }
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchBtn }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBarHeader;
