import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function FavoriteRecipes({ match }) {
  return (
    <div>
      <Header name={ match.path } />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default FavoriteRecipes;
