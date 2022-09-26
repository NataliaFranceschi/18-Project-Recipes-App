import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function DoneRecipes({ match }) {
  return (
    <div>
      <Header name={ match.path } />
    </div>
  );
}

DoneRecipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default DoneRecipes;
