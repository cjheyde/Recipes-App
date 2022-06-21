import React, { useState } from 'react';
import RecipesContext from '../MyContext/RecipesContext';
// import { propTypes } from 'prop-types';
// import { useHistory } from 'react-router-dom';

function Foods() {
  const {
    foodData,
  } = useContext(RecipesContext);

  function onClickFilterFoodCategory() {
    foodData.filter((foodCategory) => )
  }

  return (
    <div>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClickFilterFoodCategory }
      >
        Filtrar
      </button>
    </div>
  )

}

export default Foods;
