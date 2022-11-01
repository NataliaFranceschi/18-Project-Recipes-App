import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { recipeInProgressAPI, saveDone } from '../utils/requestsAPI';
import context from '../context/myContext';
import FavShareBar from '../components/FavShareBar';
import '../style/inProgress.css';
import folha from '../images/id_visual_leaf.png';

function RecipeInProgress({ match }) {
  const { id } = match.params;
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

  const filterIngredientes = ingredients.filter((e) => e !== '');
  const itensStorageMeals = progressRecipe.meals[id] || [];
  const itensStorageDrinks = progressRecipe.drinks[id] || [];

  const habilitarButton = () => {
    if (match.url.includes('meal')
      && filterIngredientes.every((e) => itensStorageMeals.includes(e))) {
      return setIsDisabled(false);
    }

    if (match.url.includes('drink')
      && filterIngredientes.every((e) => itensStorageDrinks.includes(e))) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  };

  useEffect(() => {
    habilitarButton();
  }, [progressRecipe]);

  const handleIngredientChecked = ({ target }) => {
    if (match.url.includes('meal')) {
      if (target.checked === true) {
        addMeals(id, target.value);
      } else {
        removeMeals(id, target.value);
      }
    }
    if (match.url.includes('drink')) {
      if (target.checked === true) {
        addDrinks(id, target.value);
      } else {
        removeDrinks(id, target.value);
      }
    }
  };

  const finishRecipe = () => {
    const myDate = new Date(Date.now()).toLocaleString().split(',')[0];
    if (match.url.includes('meals')) {
      const objFav = {
        id: details.idMeal,
        type: 'meal',
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb,
        doneDate: myDate,
        tags: details.strTags === null ? [] : details.strTags.split(','),
      };
      saveDone(objFav);
    } else {
      const objFav = {
        id: details.idDrink,
        type: 'drink',
        nationality: '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic,
        name: details.strDrink,
        image: details.strDrinkThumb,
        doneDate: myDate,
        tags: [],
      };
      saveDone(objFav);
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      <img
        className="folha"
        src={ folha }
        alt="folha"
      />
      <img
        className="image"
        data-testid="recipe-photo"
        src={ details[`str${item}Thumb`] }
        alt="imagem"
      />
      <h1
        className="title_details"
        data-testid="recipe-title"
      >
        { details[`str${item}`] }
      </h1>
      {
        item === 'Meal'
          ? (
            <p
              className="alcoholic"
              data-testid="recipe-category"
            >
              { `Category: ${details.strCategory}` }
            </p>
          )
          : (
            <p
              className="alcoholic"
              data-testid="recipe-category"
            >
              { details.strAlcoholic }
            </p>
          )
      }
      <div className="infos_details_container">

        <h1 className="deltails_titles_page">Ingredients</h1>
        {
          ingredients
            .filter((ele) => ele !== '')
            .map((e, i) => (
              <ul key={ i }>
                <li
                  className="ingredients"
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {`${e}: ${measure[i]}`}
                  <label
                    htmlFor="ingredientes"
                    data-testid={ `${i}-ingredient-step` }
                  >
                    <input
                      onChange={ handleIngredientChecked }
                      className="check_box"
                      name="ingredientes"
                      id="ingredientes"
                      type="checkbox"
                      value={ e }
                      checked={ verificaCheck(e) }
                    />
                  </label>
                </li>
              </ul>
            ))
        }
        <h1 className="deltails_titles_page">Instructions</h1>
        <p
          data-testid="instructions"
          className="instructions"
        >
          { details.strInstructions }
        </p>
        <button
          type="button"
          className="btn_finish"
          data-testid="finish-recipe-btn"
          disabled={ isDisabled }
          style={ isDisabled ? { opacity: '50%' } : {} }
          onClick={ finishRecipe }
        >
          Finish

        </button>
        <FavShareBar url={ match.url.replace('/in-progress', '') } recipe={ details } />
      </div>
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
