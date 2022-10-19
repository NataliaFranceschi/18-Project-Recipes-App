import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../utils/renderWithRouter';
import Provider from '../context/myProvider';

describe('Testa o componente Search Bar', () => {
  const searchButton = 'search-top-btn';
  const searchInput = 'search-input';
  const searchExec = 'exec-search-btn';

  it('Testa a procura por ingrediente em meals', async () => {
    const match = { path: '/meals' };
    renderWithRouter(
      <Provider>
        <Recipes match={ match } />
      </Provider>,
    );
    
    userEvent.click(screen.getByTestId(searchButton));
    const input = screen.getByTestId(searchInput);
    userEvent.type(input, 'bread');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(searchExec));
    await waitFor(() => expect(screen.getByText(/BBQ Pork Sloppy Joes/i)).toBeInTheDocument(), { timeout: 3000 });
  });

  it('Testa a procura por nome em meals', async () => {
    const match = { path: '/meals' };
    const { history } = renderWithRouter(
      <Provider>
        <Recipes match={ match } />
      </Provider>,
    );

    userEvent.click(screen.getByTestId(searchButton));
    const input = screen.getByTestId(searchInput);
    userEvent.type(input, 'pasta');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByTestId(searchExec));
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52777'), { timeout: 3000 });
  });

  it('Testa a procura por nome em drinks', async () => {
    const match = { path: '/drinks' };
    const { history } = renderWithRouter(
      <Provider>
        <Recipes match={ match } />
      </Provider>,
    );

    userEvent.click(screen.getByTestId(searchButton));
    const input = screen.getByTestId(searchInput);
    userEvent.type(input, 'A1');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByTestId(searchExec));
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/17222'), { timeout: 3000 });
  });

  it('Testa a procura por primeira letra em drinks', async () => {
    const match = { path: '/drinks' };
    renderWithRouter(
      <Provider>
        <Recipes match={ match } />
      </Provider>,
    );

    userEvent.click(screen.getByTestId(searchButton));
    const input = screen.getByTestId(searchInput);
    userEvent.type(input, 'g');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(searchExec));
    await waitFor(() => expect(screen.getByText(/Gimlet/i)).toBeInTheDocument(), { timeout: 3000 });
  });

  it('Testa se o alerta aparece caso tenha mais de uma letra digitada', async () => {
    const match = { path: '/drinks' };
    renderWithRouter(
      <Provider>
        <Recipes match={ match } />
      </Provider>,
    );

    global.alert = jest.fn();
    userEvent.click(screen.getByTestId(searchButton));
    const input = screen.getByTestId(searchInput);
    userEvent.type(input, 'gi');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(searchExec));

    expect(global.alert).toBeCalled();
  });

  it('Testa se o alerta aparece caso não encontre a receita de comida', async () => {
    const match = { path: '/meals' };
    renderWithRouter(
      <Provider>
        <Recipes match={ match } />
      </Provider>,
    );

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: null }),
    }));
    global.alert = jest.fn();

    userEvent.click(screen.getByTestId(searchButton));
    const input = screen.getByTestId(searchInput);
    userEvent.type(input, 'teste');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(searchExec));

    await waitFor(() => expect(global.alert).toHaveBeenCalled(), { timeout: 3000 });
  });
});
