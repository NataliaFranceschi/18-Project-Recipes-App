import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { saveFav } from '../utils/requestsAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { FAV_RECIPES } from '../utils/constants';

function FavShareBar({ url, recipe }) {
  const [alertCopy, setAlertCopy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let localSavedInfos = JSON.parse(localStorage.getItem(FAV_RECIPES));
    if (localSavedInfos === null) {
      localSavedInfos = [];
    }
    const keyObj = url.includes('meals') ? 'Meal' : 'Drink';
    setSaved(localSavedInfos.some((e) => e[`id${keyObj}`] === recipe[`id${keyObj}`]));
  }, []);

  const copyBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setAlertCopy(true);
  };

  const saveFavorite = () => {
    if (url.includes('meals')) {
      console.log(url);
      const objFav = {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      saveFav(objFav);
    } else {
      console.log(url);
      const objFav = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
      saveFav(objFav);
    }
    if (saved === true) {
      const newValue = false;
      setSaved(newValue);
    } else {
      const newValue = true;
      setSaved(newValue);
    }
  };

  return (
    <div className="buttons_container">
      <button
        type="button"
        data-testid="share-btn"
        className="button"
        onClick={ copyBoard }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {
        alertCopy
          && <p>Link copied!</p>
      }
      <button
        type="button"
        data-testid="favorite-btn"
        className="button"
        onClick={ saveFavorite }
        src={ !saved ? whiteHeartIcon : blackHeartIcon }
      >
        {
          !saved
            ? <img src={ whiteHeartIcon } alt="" />
            : <img src={ blackHeartIcon } alt="" />
        }
      </button>
    </div>
  );
}

FavShareBar.propTypes = {
  url: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FavShareBar;
