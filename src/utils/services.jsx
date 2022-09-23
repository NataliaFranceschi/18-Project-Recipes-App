import { NUMBER_SIX } from './constants';

export const validationInputs = (email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const validationEmail = emailRegex.test(email);
  const validationGeneral = validationEmail && password.length > NUMBER_SIX;
  return validationGeneral;
};

export const teste = () => {
  console.log('teste');
};
