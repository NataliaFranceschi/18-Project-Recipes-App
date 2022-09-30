import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { FAV_RECIPES } from '../utils/constants';
// import FavShareBar from '../components/FavShareBar';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes({ match }) {
  const [favorite, setFavorites] = useState([]);
  const [update, setUpdate] = useState(true);
  const [alertCopy, setAlertCopy] = useState(false);

  useEffect(() => {
    let getFavorites = JSON.parse(localStorage.getItem(FAV_RECIPES));
    if (getFavorites === null) {
      getFavorites = [];
    }

    setFavorites(getFavorites);
    setUpdate(true);
    console.log(alertCopy);
  }, [update]);

  const copyBoard = (e) => {
    const idRecipe = e.target.parentElement.previousElementSibling.attributes[1].value;
    const filterLocal = favorite.filter((fav) => fav.id === idRecipe);
    const typeRecipe = filterLocal[0].type;

    navigator.clipboard.writeText(`http://localhost:3000/${typeRecipe}s/${idRecipe}`);
    setAlertCopy(true);
    // console.log(e.target.parentElement.previousElementSibling.attributes[1].value);
    // console.log(filterLocal[0].type);
  };

  const handleteste = (e) => {
    favorite.filter((fav) => fav.id !== e.target.parentNode.id);
    const delet = favorite.filter((ele) => ele.id !== e.target.parentNode.id);
    localStorage.setItem(
      FAV_RECIPES,
      JSON.stringify(delet),
    );
    setUpdate(false);
    // console.log(e.nativeEvent.path[1].id);
  };

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
                  { e.nationality }
                  {' '}
                  -
                  {' '}
                  { e.category }
                </p>

                <button
                  type="button"
                  id={ e.id }
                  onClick={ handleteste }
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <img src={ blackHeartIcon } alt="" />
                </button>
                <button
                  type="button"
                  data-testid={ `${i}-horizontal-share-btn` }
                  className="button"
                  src={ shareIcon }
                  onClick={ copyBoard }
                >
                  <img src={ shareIcon } alt="shareIcon" />
                </button>
                {
                  alertCopy
                    && <p>Link copied!</p>
                }
                {/* <FavShareBar
                  url={ `/${e.type}s/${e.id}` }
                  recipe={ { id: e.id } }
                  delet
                /> */}
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
              <p data-testid={ `${i}-horizontal-top-text` }>
                { e.alcoholicOrNot }
              </p>
              <button
                type="button"
                id={ e.id }
                onClick={ handleteste }
                data-testid={ `${i}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
              >
                <img src={ blackHeartIcon } alt="" />
              </button>
              <button
                type="button"
                data-testid={ `${i}-horizontal-share-btn` }
                className="button"
                src={ shareIcon }
                onClick={ copyBoard }
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              {
                alertCopy
                    && <p>Link copied!</p>
              }
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
