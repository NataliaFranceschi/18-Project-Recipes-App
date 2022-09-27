import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';

import renderWithRouter from '../utils/renderWithRouter';
import { testIds, VALID_EMAIL, VALID_PASSWORD } from '../utils/constants';

const MESSAGE = 'Your search must have only 1 (one) character';

jest.spyOn(global, 'alert')
  .mockImplementation(() => MESSAGE);

describe('Testando componente SearchBar', () => {
  it('Se SearchBar é renderizado na pagina meals', async () => {
    renderWithRouter(<App />);

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

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('exec-search-btn');
    const searchTypeButton = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchTypeButton).toBeInTheDocument();
  });

  it('Se é possivel pesquisar receitas de comida', async () => {
    renderWithRouter(<App />);

    // const email = screen.getByTestId(testIds.emailInput);
    // const buttao = screen.getByTestId(testIds.loginSubmitButton);
    // const password = screen.getByTestId(testIds.passwordInput);
    // expect(buttao).toBeDisabled();
    // userEvent.type(email, VALID_EMAIL);
    // userEvent.type(password, VALID_PASSWORD);
    // expect(email).toHaveValue(VALID_EMAIL);
    // expect(password).toHaveValue(VALID_PASSWORD);
    // userEvent.click(buttao);
    // await waitFor(() => expect(screen.getByText('Meals')).toBeInTheDocument(), { timeout: 3000 });
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('exec-search-btn');
    const searchTypeButton = screen.getByTestId('search-input');
    const ingredientRadioButton = screen.getByTestId('ingredient-search-radio');
    userEvent.type(searchInput);
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);
  });

  it('Se redireciona caso pesquise apenas um receita', () => {
    const { history } = renderWithRouter(<App />);
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    const searchType = screen.getByTestId('exec-search-btn');
    const ingredientRadio = screen.getByTestId('name-search-radio');
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(ingredientRadio);
    userEvent.click(searchType);

    expect(history.location.pathname).toBe('/');
  });

  it('Pesquisa pela primeira letra', async () => {
    renderWithRouter(<App />);
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    const searchType = screen.getByTestId('exec-search-btn');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.type(searchInput, 'xablau');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchType);
    expect(global.alert).toBeCalled();
    // expect(global.alert()).toBe(MESSAGE);
  });
});
