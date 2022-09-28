import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/myContext';
import { fetchMeals, fetchCategoriesMeals,
  fetchCategoryMeal } from '../utils/requestsAPI';

function Meals() {
  const { categoryON,
    setCategoryON,
    searchON,
    setSearchON,
    searchResult,
  } = useContext(context);

  const [categories, setCategories] = useState([]);
  const [categoryMeal, setCategoryMeal] = useState([]);
  const [mealsApi, setMealsApi] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await fetchMeals();
      setMealsApi(response);

      const data = await fetchCategoriesMeals();
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
    const response = await fetchCategoryMeal(category);
    setCategoryMeal(response);
    setCategoryON(!categoryON);
    setSearchON(false);
  };

  const allMeals = () => {
    setCategoryON(false);
    setSearchON(false);
  };

  const renderCard = () => {
    if (categoryON) {
      return categoryMeal;
    } if (searchON) {
      return searchResult.meals;
    }
    return mealsApi;
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
          onClick={ allMeals }
        >
          All

        </button>
      </div>
      <div>
        {renderCard() !== undefined && twelveRecipes(renderCard())
          .map((meal, index) => (
            <Link key={ index } to={ `meals/${meal.idMeal}` }>
              <div
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </div>
            </Link>
          ))}
      </div>

    </div>
  );
}

export default Meals;
