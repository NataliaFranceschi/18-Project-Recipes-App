import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataInputs, setDataInputs] = useState({ email: '', password: '' });
  const [mealsApi, setMealsApi] = useState([]);
  const [drinksApi, setDrinksApi] = useState([]);

  const fetchMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await response.json();
    setMealsApi(meals);
  };

  const fetchDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await response.json();
    setDrinksApi(drinks);
  };

  const contextValue = {
    isDisabled,
    setIsDisabled,
    dataInputs,
    setDataInputs,
    fetchMeals,
    mealsApi,
    fetchDrinks,
    drinksApi,
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
