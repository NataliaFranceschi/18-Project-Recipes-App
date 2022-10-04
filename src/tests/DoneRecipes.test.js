import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('Testa a tela pricipal', () => {
  beforeEach(() => {
    const done = [{
      alcoholicOrNot: '',
      category: 'Side',
      doneDate: '03/10/2022 11:03:25',
      id: '52978',
      image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
      name: 'Kumpir',
      nationality: 'Turkish',
      tags: ['SideDish'],
      type: 'meal',
    },
    {
      alcoholicOrNot: 'Alcoholic',
      category: 'Shake',
      doneDate: '04/10/2022 09:53:48',
      id: '14588',
      image: 'https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg',
      name: '151 Florida Bushwacker',
      nationality: '',
      tags: [],
      type: 'drink' }];

    localStorage.setItem('doneRecipes', JSON.stringify(done));
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    const match = { path: '/done-recipes' };
    renderWithRouter(<DoneRecipes match={ match } />);
  });
  it('Verifica se a comida feita aparece na tela', async () => {
    expect(screen.getByText(/kumpir/i)).toBeInTheDocument();
    expect(screen.getByText('Done in: 03/10/2022 11:03:25')).toBeInTheDocument();
  });
  it('Verifica se a bebida feita aparece na tela', async () => {
    expect(screen.getByText(/Florida Bushwacker/i)).toBeInTheDocument();
    expect(screen.getByText('Done in: 04/10/2022 09:53:48')).toBeInTheDocument();
  });
  it('Verifica se ao clicar no drink aparece só bebida, no meal só comida e all todos', async () => {
    const allButton = screen.getByTestId(/filter-by-all-btn/i);
    const drinkButton = screen.getByTestId(/filter-by-drink-btn/i);
    const mealButton = screen.getByTestId(/filter-by-meal-btn/i);

    userEvent.click(drinkButton);
    expect(screen.getByText(/Florida Bushwacker/i)).toBeInTheDocument();
    expect(screen.queryByText(/kumpir/i)).not.toBeInTheDocument();

    userEvent.click(mealButton);
    expect(screen.getByText(/kumpir/i)).toBeInTheDocument();
    expect(screen.queryByText(/Florida Bushwacker/i)).not.toBeInTheDocument();

    userEvent.click(allButton);
    expect(screen.getByText(/Florida Bushwacker/i)).toBeInTheDocument();
    expect(screen.getByText(/kumpir/i)).toBeInTheDocument();
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
});
