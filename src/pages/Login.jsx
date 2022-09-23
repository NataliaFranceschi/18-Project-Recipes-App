import React, { useContext, useEffect } from 'react';
import context from '../context/myContext';
import { validationInputs } from '../utils/services';

function Login() {
  const {
    isDisabled,
    setIsDisabled,
    dataInputs,
    setDataInputs,
  } = useContext(context);
  const { email, password } = dataInputs;
  // console.log(dataInputs);

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
      >
        Entrar
      </button>

    </div>
  );
}

export default Login;
