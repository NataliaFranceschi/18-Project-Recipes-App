import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataInputs, setDataInputs] = useState({ email: '', password: '' });

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
