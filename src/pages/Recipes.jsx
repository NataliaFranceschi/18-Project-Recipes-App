import React from 'react';
import PropTypes from 'prop-types';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes({ match }) {
  return (
    <div>
      <Header name={ match.path } />
      {
        (match.path === '/meals') ? <Meals /> : <Drinks />
      }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default Recipes;
