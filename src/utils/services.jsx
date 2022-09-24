import { DRINKS_KEY, MEALS_KEY, NUMBER_SIX, USER_KEY } from './constants';

export const validationInputs = (email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const validationEmail = emailRegex.test(email);
  const validationGeneral = validationEmail && password.length > NUMBER_SIX;
  return validationGeneral;
};

export const localStorageUser = (email) => {
  localStorage.setItem(USER_KEY, JSON.stringify(email));
  localStorage.setItem(MEALS_KEY, JSON.stringify(1));
  localStorage.setItem(DRINKS_KEY, JSON.stringify(1));
};
