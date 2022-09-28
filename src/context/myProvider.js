import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataInputs, setDataInputs] = useState({ email: '', password: '' });
  // Para resultado da pesquisa no SearchBar
  const [searchResult, setSearchResult] = useState('');

  const [loading, setLoading] = useState(false);
  const [selectedRadioButton, setSelectedRadioButton] = useState('ingredientsRadio'); // estado do input de t
  const [categoryON, setCategoryON] = useState(false);
  const [searchON, setSearchON] = useState(false);

  const contextValue = {
    isDisabled,
    setIsDisabled,
    dataInputs,
    setDataInputs,
    loading,
    setLoading,
    selectedRadioButton,
    setSelectedRadioButton,
    categoryON,
    setCategoryON,
    searchON,
    setSearchON,

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
