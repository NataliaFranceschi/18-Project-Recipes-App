import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import recipeDetailsAPI from '../utils/requestsAPI';

function RecipeDetails({ match }) {
  // const [checkedClick, setCheckded]
  const [item, setItem] = useState('');
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const history = useHistory();
  const { pathname: pagePath } = useLocation();

  const filterIngredients = (key, response) => {
    const entriesIngredients = Object.entries(response).filter((e) => (
      e[0].includes(key) === true && e[1] !== null));
    const ingredientes = entriesIngredients.map((e) => e[1]);
    return ingredientes;
  };

  // console.log(match);

  useEffect(() => {
    const request = async () => {
      const response = await recipeDetailsAPI[match.path](match.params.id);
      console.log(response);
      console.log(match.path, match.params.id);
      const firstItem = Object.keys(response)[0];
      setDetails(response[firstItem][0]);
      const saveItem = {
        '/meals/:id': () => setItem('Meal'),
        '/drinks/:id': () => setItem('Drink'),
      };
      console.log(saveItem);
      saveItem[match.path]();
      setIngredients(filterIngredients('strIngredient', response[firstItem][0]));
      setMeasure(filterIngredients('strMeasure', response[firstItem][0]));
    };
    request();
  }, []);

  const buttonTest = () => {
    if (pagePath === `/meals/${match.params.id}`) {
      history.push(`/meals/${match.params.id}/in-progress`);
    } else {
      history.push(`/drinks/${match.params.id}/in-progress`);
    }
    console.log(pagePath);
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
              key={ e }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {`${e}: ${measure[i]}`}
            </p>
          ))
      }
      <p data-testid="instructions">{ details.strInstructions }</p>
      {
        item === 'Meal'
        && <iframe
          width="560"
          height="315"
          src={ details.strYoutube.replace('watch?v=', 'embed/') }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
          allowFullScreen
          data-testid="video"
        />
      }
      <button onClick={ buttonTest } type="button">
        Test
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired };

export default RecipeDetails;
