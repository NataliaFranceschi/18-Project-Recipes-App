import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { recipeInProgressAPI } from '../utils/requestsAPI';
import context from '../context/myContext';

function RecipeInProgress({ match }) {
  const [checkClick, setCheckClick] = useState(false);
  const { id } = useParams();
  const { addMeals, addDrinks, progressRecipe, setProgressRecipe, removeMeals } = useContext(context);
  const [item, setItem] = useState('');
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const history = useHistory();
  const { pathname: pagePath } = useLocation();
  const { path } = useRouteMatch();
  const [page, setPage] = useState('');

  const filterIngredients = (key, response) => {
    const entriesIngredients = Object.entries(response).filter((e) => (
      e[0].includes(key) === true && e[1] !== null));
    const ingredientes = entriesIngredients.map((e) => e[1]);
    return ingredientes;
  };

  const newRecipeFavorites = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  // JSON.parse(recipeFavorites);
  // console.log(match);

  useEffect(() => {
    const request2 = async () => {
      const response = await recipeInProgressAPI[match.path](match.params.id);
      // console.log(response);
      // console.log(match.path, match.params.id);
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
    const page = path.split('/')[1];
    // console.log(page);
    if (page === 'meals') {
      setPage('meal');
    } else {
      setPage('drink');
    }
  }, [path]);

  // const test2 = (e) => {
  //   const test = newRecipeFavorites.meals[id].some((favori) => favori == e.target.value);
  //   setCheckClick(test);
  //   console.log(test);
  // };

  const verificaCheck = (ingre) => {
    if (newRecipeFavorites.meals[id]) {
      newRecipeFavorites.meals[id]
        .some((itemm) => itemm === ingre);
    }
  };

  console.log(progressRecipe);

  const handleIngredientChecked = ({ target }) => {
    if (page === 'meal') {
      console.log(verificaCheck(id));

      if (!verificaCheck) {
        addMeals(id, target.value);
        console.log('entrando');
      } else {
        removeMeals(id, target.value);
      }
    }
  };
    // switch (page === 'meal') {
    // case 'meal':
    //   !verificaCheck ? addMeals(id, target.value) : removeMeals(id, target.value);
    //   break;

  // case 'drink':
  //   if (!verificaCheck) {
  //     addDrinks(id, target.value);
  //   } else {
  //     newRecipeFavorites.drinks[id].splice(target.value, 1);
  //   }
  //   break;
  // default:
  //   console.log('');
  //   break;
  // console.log(target.value);
  // console.log(progressRecipe.meals[id]);

  console.log(ingredients);

  // console.log(verificaCheck());

  // console.log(localStorage.getItem('inProgressRecipes'));

  // const test = newRecipeFavorites.meals[id].some((favorite) => favorite !== e.target.value);

  return (
    // {newRecipeFavorites.meals[id].map()};
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
          .map((e, i) =>
            // const checked = newRecipeFavorites.meals[id].includes(ingredients) && newRecipeFavorites.meals[id] === null;
            // console.log(checked);
            (
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
                    // onClick={ handleIngredientChecked }
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
