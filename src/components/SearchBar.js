import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import context from '../context/myContext';
import { fetchIngredient, fetchName, fetchLetter } from '../utils/requestsAPI';

function SearchBar() {
  const { push } = useHistory();
  const { pathname: pagePath } = useLocation();
  const { searchResult, setSearchResult } = useContext(context); // estado global da filtragem
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

  // Direciona para Details, se tiver apenas uma receita de comida ou bebida, ou (alert) para nenhum resultado
  const redirectDetails = useCallback(() => {
    if (Object.values(searchResult)[0] === undefined) {
      console.log(Object.values(searchResult)[0], Object.values(searchResult));
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (Object.values(searchResult)[0].length === 1) {
      if (pagePath === '/meals') {
        return push(`/meals/${searchResult.meals[0].idMeal}`);
      }
      if (pagePath === '/drinks') {
        console.log(Object.values(searchResult)[0], Object.values(searchResult));
        return push(`/drinks/${searchResult.drinks[0].idDrink}`);
      }
    }
  }, [pagePath, push, searchResult]);

  useEffect(() => {
    redirectDetails();
  }, [searchResult, redirectDetails]);

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
            onClick={ () => setUserFilter('firstLetterRadio') }
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
