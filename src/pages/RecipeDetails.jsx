import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { recipeDetailsAPI, recipeAPI } from '../utils/requestsAPI';
import '../style/details.css';
import shareIcon from '../images/shareIcon.svg';
import { getDoneRecipes } from '../utils/services';

function RecipeDetails({ match }) {
  const [item, setItem] = useState('');
  const [reverseItem, setreverseItem] = useState('');
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [alertCopy, setAlertCopy] = useState(false);
  const [startBtt, setSratBtt] = useState(true);
  const NUMBER_OF_RECOMMENDATIONS = 6;

  const filterIngredients = (key, response) => {
    const entriesIngredients = Object.entries(response).filter((e) => (
      e[0].includes(key)
      === true && e[1] !== '' && e[1] !== ' ' && e[1] !== null));
    const ingredientes = entriesIngredients.map((e) => e[1]);
    return ingredientes;
  };

  useEffect(() => {
    const request = async () => {
      const response = await recipeDetailsAPI[match.path](match.params.id);
      const firstItem = Object.keys(response)[0];
      setDetails(response[firstItem][0]);
      const saveItem = {
        '/meals/:id': () => {
          setItem('Meal');
          setreverseItem('Drink');
        },
        '/drinks/:id': () => {
          setItem('Drink');
          setreverseItem('Meal');
        },
      };
      setSratBtt(getDoneRecipes().some((e) => e.id === match.params.id));

      const data = await recipeAPI[match.path]();
      const key = Object.keys(data)[0];
      setRecommended(data[key]);

      saveItem[match.path]();
      setIngredients(filterIngredients('strIngredient', response[firstItem][0]));
      setMeasure(filterIngredients('strMeasure', response[firstItem][0]));
    };
    request();
  }, []);

  const history = useHistory();
  const redirect = () => {
    history.push(`${match.url}/in-progress`);
  };

  const copyBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${match.url}`);
    setAlertCopy(true);
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
        ingredients.map((e, i) => (
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
      <Carousel>
        {
          recommended.filter((_, index) => index < NUMBER_OF_RECOMMENDATIONS)
            .map((e, i) => (
              <Carousel.Item
                key={ i }
                data-testid={ `${i}-recommendation-card` }
              >
                <img
                  className="d-block w-100"
                  src={ e[`str${reverseItem}Thumb`] }
                  alt="First slide"
                />
                <Carousel.Caption data-testid={ `${i}-recommendation-title` }>
                  <h3>{ e[`str${reverseItem}`] }</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))
        }
      </Carousel>
      {
        !startBtt
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="button_start_recipe"
          onClick={ redirect }
        >
          Start Recipe
        </button>
      )
      }
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
        >
          Favoritar
        </button>
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired };

export default RecipeDetails;
