import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router-dom';
import { recipeInProgressAPI } from '../utils/requestsAPI';
import context from '../context/myContext';

function RecipeInProgress({ match }) {
  const { id } = useParams();
  const {
    addMeals,
    addDrinks,
    progressRecipe,
    setProgressRecipe,
    removeMeals,
    removeDrinks,
  } = useContext(context);
  const [item, setItem] = useState('');
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { path } = useRouteMatch();
  const [page, setPage] = useState('');

  const filterIngredients = (key, response) => {
    const entriesIngredients = Object.entries(response).filter((e) => (
      e[0].includes(key) === true && e[1] !== null));
    const ingredientes = entriesIngredients.map((e) => e[1]);
    return ingredientes;
  };

  useEffect(() => {
    const request2 = async () => {
      const response = await recipeInProgressAPI[match.path](match.params.id);
      const firstItem = Object.keys(response)[0];
      setDetails(response[firstItem][0]);
      const saveItem = {
        '/meals/:id/in-progress': () => setItem('Meal'),
        '/drinks/:id/in-progress': () => setItem('Drink'),
      };
      saveItem[match.path]();
      setIngredients(filterIngredients('strIngredient', response[firstItem][0]));
      setMeasure(filterIngredients('strMeasure', response[firstItem][0]));
    };
    request2();

    setProgressRecipe(JSON.parse(localStorage.getItem('inProgressRecipes')) || []);
  }, []);

  useEffect(() => {
    if (path.split('/')[1] === 'meals') {
      setPage('meal');
    } else {
      setPage('drink');
    }
  }, [path]);

  const verificaCheck = (ingre) => {
    if (progressRecipe.meals[id]) {
      return progressRecipe.meals[id]
        .some((itemm) => itemm === ingre);
    }
  };

  const handleIngredientChecked = ({ target }) => {
    if (page === 'meal') {
      if (target.checked === true) {
        addMeals(id, target.value);
      } else {
        removeMeals(id, target.value);
      }
    }
    if (page === 'drink') {
      if (target.checked === true) {
        addDrinks(id, target.value);
      } else {
        removeDrinks(id, target.value);
      }
    }
  };

  return (
    <div>
      <img data-testid="recipe-photo" src={ details[`str${item}Thumb`] } alt="imagem" />
      <h1 data-testid="recipe-title">{ details[`str${item}`] }</h1>
      {
        item === 'Meal'
          ? (<p data-testid="recipe-category">{ details.strCategory }</p>)
          : (
            <p data-testid="recipe-category">{ details.strAlcoholic }</p>
          )
      }
      {
        ingredients
          .filter((ele) => ele !== '')
          .map((e, i) => (
            <p
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {`${e}: ${measure[i]}`}
              <label
                htmlFor="ingredientes"
                data-testid={ `${i}-ingredient-step` }
              >
                <input
                  onChange={ handleIngredientChecked }
                  name="ingredientes"
                  id="ingredientes"
                  type="checkbox"
                  value={ e }
                  checked={ verificaCheck(e) }
                />
              </label>
            </p>
          ))
      }
      <p data-testid="instructions">{ details.strInstructions }</p>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <button type="button" data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired };

export default RecipeInProgress;
