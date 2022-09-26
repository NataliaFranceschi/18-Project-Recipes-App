import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ name }) {
  const validationHeader = {
    '/meals': ['Meals', { perfil: true }, { pesquisa: true }],
    '/drinks': ['Drinks', { perfil: true }, { pesquisa: true }],
    '/profile': ['Profile', { perfil: true }, { pesquisa: false }],
    '/done-recipes': ['Done Recipes', { perfil: true }, { pesquisa: false }],
    '/favorite-recipes': ['Favorite Recipes', { perfil: true }, { pesquisa: false }],
  };

  return (
    <div data-testid="page-title">
      {
        validationHeader[name][1].perfil
        && <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
      }
      {
        validationHeader[name][2].pesquisa
        && <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
      }
      <h1 ata-testid="page-title">{ validationHeader[name][0] }</h1>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
