import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/myContext';
// import { useStoragedrinksToken,
//   useStorageMeals, useStorageUser } from '../utils/hooks/useStorage';
// eslint-disable-next-line import/named
import { validationInputs, localStorageUser } from '../utils/services';

function Login() {
  const {
    isDisabled,
    setIsDisabled,
    dataInputs,
    setDataInputs,
  } = useContext(context);

  const history = useHistory();

  const { email, password } = dataInputs;
  // console.log(dataInputs);
  // const [dataInputLocalStorage, setDataInputLocalStorage] = useStorageUser('user', {});
  // const [mealsTokenLocalStorage,
  //   setMealsTokenLocalStorage] = useStorageMeals('mealsToken', '');

  // const [drinksTokenLocalStorage,
  //   setdrinksTokenLocalStorage] = useStoragedrinksToken('drinksToken', '');

  // console.log(dataInputLocalStorage, mealsTokenLocalStorage, drinksTokenLocalStorage);

  // const localStorage = () => {
  //   setDataInputLocalStorage({ email });
  //   setMealsTokenLocalStorage(1);
  //   setdrinksTokenLocalStorage(1);
  // };

  const handleInsertStorage = () => {
    localStorageUser({ email });
    history.push('/meals');
  };

  useEffect(() => {
    const validationGeneral = validationInputs(email, password);

    if (validationGeneral) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          name="email"
          id="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => setDataInputs({ ...dataInputs,
            email: value }) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => setDataInputs({ ...dataInputs,
            password: value }) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleInsertStorage }
      >
        Entrar
      </button>

    </div>
  );
}

export default Login;
