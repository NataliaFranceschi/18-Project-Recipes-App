import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function Meals() {
  const [showElement, setShowElement] = useState(false);
  const showOrHide = () => setShowElement(true);

  return (
    <div>
      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ showOrHide }
      >
        Pesquisar
      </button>
      { showElement ? <SearchBar /> : null }
    </div>
  );
}

export default Meals;
