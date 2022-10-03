import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Recipes from '../pages/Recipes';
import { testIds, VALID_EMAIL, VALID_PASSWORD } from '../utils/constants';
import App from '../App';
import Provider from '../context/myProvider';

describe('Testa a tela pricipal', () => {
  it('Verifica se aparecem 12 receitas de comida', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    await waitFor(() => expect(screen.getByTestId(/11-card-name/i)).toBeInTheDocument(), { timeout: 3000 });
    const card = screen.getAllByTestId(/card-name/i);
    expect(card.length).toBe(12);
  });
  it('Verifica se aparecem 5 botoes de categorial + botao all', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByTestId(/Beef-category-filter/i)).toBeInTheDocument(), { timeout: 3000 });
    const button = screen.getAllByTestId(/category-filter/i);
    expect(button.length).toBe(6);
  });
  it('Verifica se aparecem 12 receitas de bebidas', async () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );

    await waitFor(() => expect(screen.getByTestId(/11-card-name/i)).toBeInTheDocument(), { timeout: 3000 });
    const card = screen.getAllByTestId(/card-name/i);
    expect(card.length).toBe(12);
  });
  it('Verifica se aparecem 5 botoes de categorial + botao all', async () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByTestId(/Cocktail-category-filter/i)).toBeInTheDocument(), { timeout: 3000 });
    const button = screen.getAllByTestId(/category-filter/i);
    expect(button.length).toBe(6);
  });
  it('Verifica ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    history.push('/drinks');
    expect(history.location.pathname).toBe('/drinks');
    await waitFor(screen.getByText('Drinks')).toBeInTheDocument();
  });
  /* it('Verifica ', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(testIds.emailInput);
    const buttao = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(buttao).toBeDisabled();
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(email).toHaveValue(VALID_EMAIL);
    expect(password).toHaveValue(VALID_PASSWORD);
    userEvent.click(buttao);
    await waitFor(() => expect(screen.getByText('Meals')).toBeInTheDocument(), { timeout: 3000 });
    const drink = screen.getByTestId(/drinks-bottom-btn/i);
    userEvent.click(drink);
    await waitFor(() => expect(screen.getByText('Drinks')).toBeInTheDocument(), { timeout: 3000 });
    expect(history.location.pathname).toBe('/drink');
  }); */
});
