import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import context from '../context/myContext';
import { fetchIngredient, fetchName, fetchLetter } from '../utils/requestsAPI';

function SearchBar() {
  const { pathname: pagePath } = useLocation();
  const { setSearchResult } = useContext(context); // estado global da filtragem
  const [searchCharacters, setSearchCharacters] = useState(''); // estado do input de texto p/ filtro
  const [userFilter, setUserFilter] = useState(''); // estado dos radios

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    switch (userFilter) {
    case 'ingredientsRadio':
      setSearchResult(await fetchIngredient(searchCharacters, pagePath));
      break;
    case 'nameRadio':
      setSearchResult(await fetchName(searchCharacters, pagePath));
      break;
    case 'firstLetterRadio':
      if (searchCharacters.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      setSearchResult(await fetchLetter(searchCharacters, pagePath));
      break;
    default:
      global.alert('selecione um filtro para pesquisar');
      break;
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="searchBarInput">
          <input
            data-testid="search-input"
            type="text"
            placeholder="Pesquisa"
            name="searchBarInput"
            id="searchBarInput"
            value={ searchCharacters }
            onChange={ ({ target: { value } }) => setSearchCharacters(value) }
          />
        </label>
        <label htmlFor="ingredientsRadio">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="radio"
            id="ingredientsRadio"
            onClick={ () => setUserFilter('ingredientsRadio') }
          />
          Por Ingrediente
        </label>
        <label htmlFor="nameRadio">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="radio"
            id="nameRadio"
            onClick={ () => setUserFilter('nameRadio') }
          />
          Por Nome
        </label>
        <label htmlFor="firstLetterRadio">
          <input
            data-testid="first-letter-search-radio"
            name="radio"
            type="radio"
            id="firstLetterRadio"
            onClick={ () => setUserFilter('first-letter') }
          />
          Pela Letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleSubmitButton }
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
