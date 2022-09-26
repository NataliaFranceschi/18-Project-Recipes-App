import React, { useState } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  // const { push } = useHistory();
  // const { pathname: pagePath } = useLocation();

  const [isDisabled, setIsDisabled] = useState(true);
  const [dataInputs, setDataInputs] = useState({ email: '', password: '' });
  // Para resultado da pesquisa no SearchBar
  const [searchResult, setSearchResult] = useState('');

  // Direciona para Details, se tiver apenas uma receita de comida ou bebida, ou (alert) para nenhum resultado
  // const redirectDetails = useCallback(() => {
  //   if (searchResult && Object.values(searchResult)[0] === null) {
  //     return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  //   }
  //   if (searchResult && Object.values(searchResult)[0].length === 1) {
  //     if (pagePath === '/meals') {
  //       return push(`/meals/${searchResult.meals[0].idMeal}`);
  //     }
  //     if (pagePath === '/drinks') {
  //       return push(`/drinks/${searchResult.drinks[0].idDrink}`);
  //     }
  //   }
  // }, [pagePath, push, searchResult]);

  // useEffect(() => {
  //   redirectDetails();
  // }, [searchResult, redirectDetails]);

  const contextValue = {
    isDisabled,
    setIsDisabled,
    dataInputs,
    setDataInputs,
    // dataInputLocalStorage,
    // setDataInputLocalStorage,
    // mealsTokenStorage,
    // setMealsTokenStorage,
    // drinksTokenStorage,
    // setDrinksTokenStorage,
    searchResult,
    setSearchResult,

  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
