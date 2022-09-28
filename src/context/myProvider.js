import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataInputs, setDataInputs] = useState({ email: '', password: '' });
  // Para resultado da pesquisa no SearchBar
  const [searchResult, setSearchResult] = useState('');

  const [progressRecipe, setProgressRecipe] = useState({
    drinks: {},
    meals: {},
  });
  const [loading, setLoading] = useState(false);
  const [selectedRadioButton, setSelectedRadioButton] = useState('ingredientsRadio'); // estado do input de t
  const [categoryON, setCategoryON] = useState(false);
  const [searchON, setSearchON] = useState(false);

  const addDrinks = (id, ingredient) => {
    setProgressRecipe((prevProgress) => {
      const drinksPrevState = prevProgress.drinks[id] ? prevProgress.drinks[id] : [];
      return {
        ...prevProgress,
        drinks: {
          ...prevProgress.drinks,
          [id]: [
            ...drinksPrevState,
            ingredient,
          ],
        },
      };
    });
    console.log('Drinks');
  };

  const addMeals = (id, ingredient) => {
    setProgressRecipe((prevProgress) => {
      const mealsPrevState = prevProgress.meals[id] ? prevProgress.meals[id] : [];
      return {
        ...prevProgress,
        meals: {
          ...prevProgress.meals,
          [id]: [
            ...mealsPrevState,
            ingredient,
          ],
        },
      };
    });
  };

  const removeMeals = (id, ingredient) => {
    setProgressRecipe((prevProgress) => {
      const mealsPrevState = prevProgress.meals[id] ? prevProgress.meals[id] : [];
      return {
        ...prevProgress,
        meals: {
          ...prevProgress.meals,
          [id]: [
            ...mealsPrevState,
          ].splice(ingredient, 1),
        },
      };
    });
  };

  const localStorageIngredientProgress = () => {
    const storageRecipes = localStorage.getItem('inProgressRecipes');
    if (storageRecipes) {
      setProgressRecipe(JSON.parse(storageRecipes));
    }
  };

  useEffect(() => {
    localStorageIngredientProgress();
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
  }, [progressRecipe]);

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
    progressRecipe,
    setProgressRecipe,
    removeMeals,

    // dataInputLocalStorage,
    // setDataInputLocalStorage,
    // mealsTokenStorage,
    // setMealsTokenStorage,
    // drinksTokenStorage,
    // setDrinksTokenStorage,
    searchResult,
    setSearchResult,
    localStorageIngredientProgress,
    addMeals,
    addDrinks,

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
