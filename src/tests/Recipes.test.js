import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
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

  it('Verifica se aparecem 5 botoes de categorias + botao all', async () => {
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

  it('Verifica se aparecem 5 botoes de categorias + botao all', async () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByTestId(/Cocktail-category-filter/i)).toBeInTheDocument(), { timeout: 3000 });
    const button = screen.getAllByTestId(/category-filter/i);
    expect(button.length).toBe(6);
  });

  it('Verifica se quando o path é drinks renderiza drinks  ', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    expect(history.location.pathname).toBe('/drinks');
    await waitFor(() => expect(screen.getByText('Drinks')).toBeInTheDocument());
  });

  it('verifica se ao clicar na categoria Cocktail aparece 155 Belmont e quando clica em all volta todas as bebidas', async () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByTestId(/Cocktail-category-filter/i)).toBeInTheDocument(), { timeout: 3000 });
    userEvent.click(screen.getByTestId(/Cocktail-category-filter/i));
    await waitFor(() => expect(screen.getByText(/155 Belmont/i)).toBeInTheDocument());
    userEvent.click(screen.getByTestId(/All-category-filter/i));
    await waitFor(() => expect(screen.getByText(/A1/i)).toBeInTheDocument());
  });

  it('verifica se ao clicar na categoria Beef aparece Beef Lo Mein e quando clica em all volta todas as comidas', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByTestId(/Beef-category-filter/i)).toBeInTheDocument(), { timeout: 3000 });
    userEvent.click(screen.getByTestId(/Beef-category-filter/i));
    await waitFor(() => expect(screen.getByText(/Beef Lo Mein/i)).toBeInTheDocument());
    userEvent.click(screen.getByTestId(/All-category-filter/i));
    await waitFor(() => expect(screen.getByText(/Corba/i)).toBeInTheDocument());
  });
});
