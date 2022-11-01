import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import { saveFav } from '../utils/requestsAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { FAV_RECIPES } from '../utils/constants';
import '../style/favShareBar.css';
import logo from '../images/logo_b.png';

function FavShareBar({ url, recipe, delet }) {
  const history = useHistory();
  const [alertCopy, setAlertCopy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let localSavedInfos = JSON.parse(localStorage.getItem(FAV_RECIPES));
    if (localSavedInfos === null) {
      localSavedInfos = [];
    }
    const keyObj = url.includes('meals') ? 'Meal' : 'Drink';
    const validation = localSavedInfos.some((e) => (
      e.id === recipe[`id${keyObj}`]));
    setSaved(validation);
  }, [recipe]);

  const copyBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setAlertCopy(true);
  };

  const saveFavorite = () => {
    if (delet === true) {
      saveFav(recipe);
    } else if (url.includes('meals')) {
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
      <img
        className="logob"
        src={ logo }
        alt="logo"
        role="presentation"
        onClick={ () => history.push('/meals') }
      />
    </div>
  );
}

FavShareBar.propTypes = {
  url: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  delet: PropTypes.bool,

};

FavShareBar.defaultProps = {
  delet: false,
};

export default FavShareBar;
