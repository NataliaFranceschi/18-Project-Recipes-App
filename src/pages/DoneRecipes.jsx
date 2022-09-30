import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function DoneRecipes({ match }) {
  return (
    <div>
      <Header name={ match.path } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-meal-btn">Meals</button>
        <button type="button" data-testid="filter-by-drink-btn">Drink</button>
        {/* <img
          data-testid={ `${done.idDrink
          }-horizontal-image` }
          src={ done.strDrinkThumb }
          alt=""
        />
        <p data-testid={ `${index}-horizontal-top-text` }>texto da categoria </p>
        <p data-testid={ `${index}-horizontal-name` }>texto do nome </p>
        <p data-testid={ `${index}-horizontal-done-date` }>texto da data </p>
        <p data-testid={ `${index}-horizontal-share-btn` }>elemento de compartilhar </p>
        <span data-testid={ `${index}-${tagName}-horizontal-tag` } /> */}
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default DoneRecipes;
