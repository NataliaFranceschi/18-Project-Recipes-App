// export const fetchIngredient = async (ingredient, pagePath) => {
//   const endPoint = pagePath === '/meals'
//     ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
//     : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
//   const data = await fetch(endPoint)
//     .then((response) => response.json())
//     .then((json) => json);
//   return data;
// };

// export const fetchName = async (name, pagePath) => {
//   const endPoint = pagePath === '/meals'
//     ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
//     : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
//   const data = await fetch(endPoint)
//     .then((response) => response.json())
//     .then((json) => json);
//   return data;
// };

// export const fetchLetter = async (letter, pagePath) => {
//   const endPoint = pagePath === '/meals'
//     ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
//     : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
//   const data = await fetch(endPoint)
//     .then((response) => response.json())
//     .then((json) => json);
//   return data;
// };
