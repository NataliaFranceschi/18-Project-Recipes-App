const recipeDetailsAPI = {
  '/meals/:id': async (id) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  },
  '/drinks/:id': async (id) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  },
};

export default recipeDetailsAPI;
