import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { FAV_RECIPES } from '../utils/constants';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import all from '../images/all.svg';
import meals from '../images/mealIcon.svg';
import drinks from '../images/drinkIcon.svg';
import '../style/doneFavorite.css';

function FavoriteRecipes({ match }) {
  const [favorite, setFavorites] = useState([]);
  const [renderFav, setRenderFav] = useState([]);
  const [update, setUpdate] = useState(true);
  const [alertCopy, setAlertCopy] = useState('');

  useEffect(() => {
    let getFavorites = JSON.parse(localStorage.getItem(FAV_RECIPES));
    if (getFavorites === null) {
      getFavorites = [];
    }

    setFavorites(getFavorites);
    setRenderFav(getFavorites);
    setUpdate(true);
  }, [update]);

  const copyBoard = (id) => {
    setAlertCopy(id);
    const idRecipe = id;
    const filterLocal = favorite.filter((fav) => fav.id === idRecipe);
    const typeRecipe = filterLocal[0].type;

    navigator.clipboard.writeText(`http://localhost:3000/${typeRecipe}s/${idRecipe}`);
  };

  const deletFavorite = (id) => {
    favorite.filter((fav) => fav.id !== id);
    const delet = favorite.filter((ele) => ele.id !== id);
    localStorage.setItem(
      FAV_RECIPES,
      JSON.stringify(delet),
    );
    setUpdate(false);
  };

  const handleFilter = ({ target: { id } }) => {
    if (id !== 'all') {
      setRenderFav(favorite.filter((e) => e.type === id));
    } else {
      setRenderFav(favorite);
    }
  };

  return (
    <div>
      <Header name={ match.path } />
      <div className="options">
        <div>
          <div className="circle">
            <img
              type="button"
              data-testid="filter-by-all-btn"
              id="all"
              onClick={ handleFilter }
              src={ all }
              role="presentation"
              alt="all"
              className="iconOptions"
            />
          </div>
          <span>All</span>
        </div>
        <div>
          <div className="circle">
            <img
              type="button"
              data-testid="filter-by-meal-btn"
              id="meal"
              onClick={ handleFilter }
              src={ meals }
              role="presentation"
              alt="meals"
              className="iconOptions"
            />
          </div>
          <span>Meals</span>
        </div>
        <div>
          <div className="circle">
            <img
              type="button"
              data-testid="filter-by-drink-btn"
              id="drink"
              onClick={ handleFilter }
              src={ drinks }
              role="presentation"
              alt="drinks"
              className="iconOptions"
            />
          </div>
          <span>Drinks</span>
        </div>
      </div>
      {
        renderFav.map((e, i) => {
          if (e.type === 'meal') {
            return (
              <div key={ e.id } className="cardRecipe">
                <Link to={ `meals/${e.id}` }>
                  <img
                    src={ e.image }
                    alt={ e.name }
                    data-testid={ `${i}-horizontal-image` }
                    width="150"
                  />
                </Link>
                <div className="recipeInformation">
                  <Link to={ `meals/${e.id}` }>
                    <p data-testid={ `${i}-horizontal-name` } className="recipeName">
                      { e.name }
                    </p>
                  </Link>
                  <p data-testid={ `${i}-horizontal-top-text` }>
                    { e.nationality }
                    {' '}
                    -
                    {' '}
                    { e.category }
                  </p>
                  <button
                    type="button"
                    className="icons"
                    onClick={ () => deletFavorite(e.id) }
                    data-testid={ `${i}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                  >
                    <img src={ blackHeartIcon } alt="" />
                  </button>
                  <button
                    type="button"
                    data-testid={ `${i}-horizontal-share-btn` }
                    className="button icons"
                    src={ shareIcon }
                    onClick={ () => copyBoard(e.id) }
                  >
                    <img src={ shareIcon } alt="shareIcon" />
                  </button>
                  {
                    (alertCopy.includes(e.id))
                    && <p>Link copied!</p>
                  }
                </div>
              </div>
            );
          }
          return (
            <div key={ e.id } className="cardRecipe">
              <Link to={ `drinks/${e.id}` }>
                <img
                  src={ e.image }
                  alt={ e.name }
                  data-testid={ `${i}-horizontal-image` }
                  width="150"
                />
              </Link>
              <div className="recipeInformation">
                <Link to={ `drinks/${e.id}` }>
                  <p data-testid={ `${i}-horizontal-name` } className="recipeName">
                    { e.name }
                  </p>
                </Link>
                <p data-testid={ `${i}-horizontal-top-text` }>
                  { e.alcoholicOrNot }
                </p>
                <button
                  type="button"
                  onClick={ () => deletFavorite(e.id) }
                  className="icons"
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <img src={ blackHeartIcon } alt="" />
                </button>
                <button
                  type="button"
                  data-testid={ `${i}-horizontal-share-btn` }
                  className="button icons"
                  src={ shareIcon }
                  onClick={ () => copyBoard(e.id) }
                >
                  <img src={ shareIcon } alt="shareIcon" />
                </button>
                {
                  (alertCopy.includes(e.id))
                    && <p>Link copied!</p>
                }
              </div>
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
