import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { FAV_RECIPES } from '../utils/constants';
import FavShareBar from '../components/FavShareBar';

function FavoriteRecipes({ match }) {
  const [favorite, setFavorites] = useState([]);

  useEffect(() => {
    let getFavorites = JSON.parse(localStorage.getItem(FAV_RECIPES));
    if (getFavorites === null) {
      getFavorites = [];
    }

    setFavorites(getFavorites);
  }, []);

  return (
    <div>
      <Header name={ match.path } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        favorite.map((e, i) => {
          if (e.type === 'meal') {
            return (
              <div key={ e.id }>
                <img
                  src={ e.image }
                  alt={ e.name }
                  data-testid={ `${i}-horizontal-image` }
                />
                <p data-testid={ `${i}-horizontal-name` }>
                  { e.name }
                </p>
                <p data-testid={ `${i}-horizontal-top-text` }>
                  { e.category }
                </p>
                <p>{ e.nationality }</p>
                <FavShareBar
                  url={ `/${e.type}s/${e.id}` }
                  recipe={ { id: e.id } }
                  delet
                />
              </div>
            );
          }
          return (
            <div key={ e.id }>
              <img
                src={ e.image }
                alt={ e.name }
                data-testid={ `${i}-horizontal-image` }
              />
              <p data-testid={ `${i}-horizontal-name` }>
                { e.name }
              </p>
              <p>{ e.alcoholicOrNot }</p>
              <FavShareBar
                url={ `/${e.type}s/${e.id}` }
                recipe={ { id: e.id } }
                delet
              />
            </div>
          );
        })
      }
    </div>
  );
}

FavoriteRecipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default FavoriteRecipes;
