import React from 'react';
import PropTypes from 'prop-types';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes({ match }) {
  return (
    (match.path === '/meals') ? <Meals /> : <Drinks />
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default Recipes;
