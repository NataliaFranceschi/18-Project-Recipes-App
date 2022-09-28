import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/myContext';
import { fetchCategoriesDrinks, fetchDrinks,
  fetchCaterogyDrink } from '../utils/requestsAPI';

function Drinks() {
  const {
    setCategoryON,
    searchON,
    setSearchON,
    searchResult,
    categoryON,
  } = useContext(context);
  const [categories, setCategories] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [drinksApi, setDrinksApi] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await fetchDrinks();
      setDrinksApi(response);

      const data = await fetchCategoriesDrinks();
      const NUMBER_OF_CATEGORIES = 5;
      setCategories(data
        .filter((_, index) => index >= 0 && index < NUMBER_OF_CATEGORIES));
    };
    request();
    setCategoryON(false);
    setSearchON(false);
  }, []);

  const twelveRecipes = (array) => {
    const NUMBER_OF_RECIPES = 12;
    return array.filter((_, index) => index >= 0 && index < NUMBER_OF_RECIPES);
  };

  const handleClick = async (category) => {
    const response = await fetchCaterogyDrink(category);
    setCategoryDrink(response);
    setCategoryON(!categoryON);
    setSearchON(false);
  };

  const allDrinks = () => {
    setCategoryON(false);
    setSearchON(false);
  };

  const renderCard = () => {
    if (categoryON) {
      return categoryDrink;
    } if (searchON) {
      return searchResult.drinks;
    }
    return drinksApi;
  };

  return (
    <div>
      <div>
        {categories.map(({ strCategory }, index) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ index }
            type="button"
            onClick={ () => handleClick(strCategory) }
          >
            {strCategory}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ allDrinks }
        >
          All

        </button>
      </div>
      <div>
        {renderCard() !== undefined && twelveRecipes(renderCard())
          .map((drink, index) => (
            <Link key={ index } to={ `drinks/${drink.idDrink}` }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Drinks;
