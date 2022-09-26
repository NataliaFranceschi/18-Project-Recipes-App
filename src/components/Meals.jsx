import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/myContext';

function Meals() {
  const { fetchMeals, mealsApi } = useContext(context);
  const [categories, setCategories] = useState([]);
  const [categoryMeal, setCategoryMeal] = useState([]);
  const [categoryOff, setCategoryOff] = useState(true);

  const fetchCategoryMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals } = await response.json();
    const NUMBER_OF_CATEGORIES = 5;
    setCategories(meals.filter((_, index) => index >= 0 && index < NUMBER_OF_CATEGORIES));
  };

  useEffect(() => {
    fetchMeals();
    fetchCategoryMeals();
  }, []);

  const twelveRecipes = (array) => {
    const NUMBER_OF_RECIPES = 12;
    return array.filter((_, index) => index >= 0 && index < NUMBER_OF_RECIPES);
  };

  const handleClick = async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const { meals } = await response.json();
    setCategoryMeal(meals);
    setCategoryOff(false);
  };

  const allMeals = () => {
    setCategoryOff(true);
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
        { (categoryOff ? twelveRecipes(mealsApi) : twelveRecipes(categoryMeal))
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
