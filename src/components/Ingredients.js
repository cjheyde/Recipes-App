import React from 'react';
import PropTypes from 'prop-types';

function Ingredients({ value, index, measure }) {
  return (
    <h3>{`${value} - ${measure[index]}`}</h3>
  );
}

Ingredients.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  measure: PropTypes.string.isRequired,
};

export default Ingredients;
