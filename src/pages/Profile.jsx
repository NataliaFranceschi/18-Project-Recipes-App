import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ match }) {
  return (
    <div>
      <Header name={ match.path } />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default Profile;
