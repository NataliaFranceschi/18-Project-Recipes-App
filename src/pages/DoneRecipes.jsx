import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { DONE_RECIPES } from '../utils/constants';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes({ match }) {
  const [dones, setDones] = useState([]);
  const [renderDones, setRenderDones] = useState([]);
  const [update, setUpdate] = useState(true);
  const [alertCopy, setAlertCopy] = useState(false);

  useEffect(() => {
    let getDones = JSON.parse(localStorage.getItem(DONE_RECIPES));
    if (getDones === null) {
      getDones = [];
    }

    setDones(getDones);
    setRenderDones(getDones);
    setUpdate(true);
  }, [update]);

  const copyBoard = ({ target: { id } }) => {
    navigator.clipboard.writeText(`http://localhost:3000${id}`);
    setAlertCopy(true);
  };

  const handleFilter = ({ target: { id } }) => {
    if (id !== 'all') {
      setRenderDones(dones.filter((e) => e.type === id));
    } else {
      setRenderDones(dones);
    }
  };

  return (
    <div>
      <Header name={ match.path } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          id="all"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          id="meal"
          onClick={ handleFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          id="drink"
          onClick={ handleFilter }
        >
          Drinks
        </button>
        {
          renderDones.map((e, i) => {
            if (e.type === 'meal') {
              return (
                <div key={ e.id }>
                  <Link to={ `meals/${e.id}` }>
                    <img
                      src={ e.image }
                      alt={ e.name }
                      data-testid={ `${i}-horizontal-image` }
                      width="200"
                    />
                  </Link>
                  <Link to={ `meals/${e.id}` }>
                    <p data-testid={ `${i}-horizontal-name` }>
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
                  <p data-testid={ `${i}-horizontal-done-date` }>
                    { e.doneDate }
                  </p>
                  { e.tags.filter((_, index) => (index < 2)).map((tag) => (
                    <span
                      key={ tag }
                      data-testid={ `${i}-${tag}-horizontal-tag` }
                    >
                      { tag }
                    </span>
                  )) }
                  <button
                    type="button"
                    data-testid={ `${i}-horizontal-share-btn` }
                    className="button"
                    src={ shareIcon }
                    onClick={ copyBoard }
                  >
                    <img id={ `/meals/${e.id}` } src={ shareIcon } alt="shareIcon" />
                  </button>
                  {
                    alertCopy
                    && <p>Link copied!</p>
                  }
                </div>
              );
            }
            return (
              <div key={ e.id }>
                <Link to={ `drinks/${e.id}` }>
                  <img
                    src={ e.image }
                    alt={ e.name }
                    data-testid={ `${i}-horizontal-image` }
                    width="200"
                  />
                </Link>
                <Link to={ `drinks/${e.id}` }>
                  <p data-testid={ `${i}-horizontal-name` }>
                    { e.name }
                  </p>
                </Link>
                <p data-testid={ `${i}-horizontal-top-text` }>
                  { e.alcoholicOrNot }
                </p>
                <p data-testid={ `${i}-horizontal-done-date` }>
                  { e.doneDate }
                </p>
                <button
                  type="button"
                  data-testid={ `${i}-horizontal-share-btn` }
                  className="button"
                  src={ shareIcon }
                  onClick={ copyBoard }
                >
                  <img id={ `/drinks/${e.id}` } src={ shareIcon } alt="shareIcon" />
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
    </div>
  );
}

DoneRecipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default DoneRecipes;
