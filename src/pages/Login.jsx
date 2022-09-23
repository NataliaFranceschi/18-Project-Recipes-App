import React, { useContext } from 'react';
import context from '../context/myContext';

function Login() {
  const {
    isDisabled,
    dataInputs,
    setDataInputs,
  } = useContext(context);
  const { name, password } = dataInputs;
  console.log(dataInputs);

  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          name="email"
          id="email"
          data-testid="email-input"
          value={ name }
          onChange={ ({ target: { value } }) => setDataInputs({ ...dataInputs,
            name: value }) }
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
