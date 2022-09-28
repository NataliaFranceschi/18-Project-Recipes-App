import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function FavShareBar({ url }) {
  const [alertCopy, setAlertCopy] = useState(false);

  const copyBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${url}`);
    setAlertCopy(true);
  };

  return (
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
  );
}

FavShareBar.propTypes = {
  url: PropTypes.string.isRequired,
};

export default FavShareBar;
