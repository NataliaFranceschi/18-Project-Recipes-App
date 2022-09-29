import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { recipeInProgressAPI } from '../utils/requestsAPI';
import context from '../context/myContext';
import FavShareBar from '../components/FavShareBar';

function RecipeInProgress({ match }) {
  const { id } = useParams();
  const history = useHistory();
  const {
    addMeals,
    addDrinks,
    progressRecipe,
    removeMeals,
    removeDrinks,
    ingredients,
    setIngredients,
  } = useContext(context);

  const [item, setItem] = useState('');
  const [details, setDetails] = useState({});
  const [measure, setMeasure] = useState([]);
  const { path } = useRouteMatch();
  const [page, setPage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

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

    if (progressRecipe.drinks[id]) {
      return progressRecipe.drinks[id]
        .some((itemm) => itemm === ingre);
    }
  };

  const filterIngredientes = ingredients.filter((ele) => ele !== '');
  const numberItensStorageMeals = progressRecipe.meals[id] || [];
  const numberItensStorageDrinks = progressRecipe.drinks[id] || [];

  const habilitarButton = () => {
    if (page === 'meal' && filterIngredientes.length
    === numberItensStorageMeals.length) {
      return setIsDisabled(false);
    }

    if (page === 'drink' && filterIngredientes.length
    === numberItensStorageDrinks.length) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  };

  useEffect(() => {
    habilitarButton();
  }, [progressRecipe]);

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

  // console.log(page);

  const redirect = () => {
    history.push('/done-recipes');
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
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ redirect }
      >
        Finish

      </button>
      <FavShareBar url={ match.url.replace('/in-progress', '') } />
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired };

export default RecipeInProgress;
