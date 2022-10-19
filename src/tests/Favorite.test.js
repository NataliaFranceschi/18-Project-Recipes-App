import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa a tela pricipal', () => {
  beforeEach(() => {
    const favorite = [{
      alcoholicOrNot: 'Alcoholic',
      category: 'Cocktail',
      id: '17222',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      name: 'A1',
      nationality: '',
      type: 'drink',
    },
    { alcoholicOrNot: '',
      category: 'Side',
      id: '53060',
      image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      name: 'Burek',
      nationality: 'Croatian',
      type: 'meal' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    const match = { path: '/favorite-recipes' };
    renderWithRouter(<FavoriteRecipes match={ match } />);
  });

  it('Verifica se a comida salva aparece na tela', async () => {
    expect(screen.getByText(/Burek/i)).toBeInTheDocument();
  });

  it('Verifica se a bebida salva aparece na tela', async () => {
    expect(screen.getByText(/A1/i)).toBeInTheDocument();
  });

  it('Verifica se copia o link da bebida', async () => {
    const shareButton = screen.getByTestId(/0-horizontal-share-btn/i);
    userEvent.click(shareButton);
    const link = await screen.findAllByText(/Link copied!/i);
    expect(link[1]).toBeInTheDocument();
  });

  it('Verifica se copia o link da comida', async () => {
    const shareButton = screen.getByTestId(/1-horizontal-share-btn/i);
    userEvent.click(shareButton);
    const link = await screen.findAllByText(/Link copied!/i);
    expect(link[1]).toBeInTheDocument();
  });

  it('Verifica se ao clicar no coração a comida é desvaforitada', async () => {
    const favorite = screen.getByTestId(/1-horizontal-favorite-btn/i);
    userEvent.click(favorite);
    expect(screen.queryByText(/Burek/i)).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar no coração a bebida é desvaforitada', async () => {
    const favorite = screen.getByTestId(/0-horizontal-favorite-btn/i);
    userEvent.click(favorite);
    expect(screen.queryByText(/A1/i)).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar no drink aparece só bebida, no meal só comida e all todos', async () => {
    const allButton = screen.getByTestId(/filter-by-all-btn/i);
    const drinkButton = screen.getByTestId(/filter-by-drink-btn/i);
    const mealButton = screen.getByTestId(/filter-by-meal-btn/i);

    userEvent.click(drinkButton);
    expect(screen.getByText(/A1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Burek/i)).not.toBeInTheDocument();

    userEvent.click(mealButton);
    expect(screen.getByText(/Burek/i)).toBeInTheDocument();
    expect(screen.queryByText(/A1/i)).not.toBeInTheDocument();

    userEvent.click(allButton);
    expect(screen.getByText(/A1/i)).toBeInTheDocument();
    expect(screen.getByText(/Burek/i)).toBeInTheDocument();
  });
});
