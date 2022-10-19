import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithRouter from '../utils/renderWithRouter';
import Provider from '../context/myProvider';

describe('Testa a tela Recipe In Progress', () => {
  const drinks = { path: '/drinks/:id/in-progress', params: { id: '17222' }, url: '/drinks/17222/in-progress' };
  const meals = { path: '/meals/:id/in-progress', params: { id: '52977' }, url: '/meals/52977/in-progress' };

  it('Testa se usando o id da receita de comida Corba, os ingredientes marcados já vem com check', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: { 52977: ['Lentils', 'Onion'] } }));
    renderWithRouter(
      <Provider>
        <RecipeInProgress match={ meals } />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByText(/corba/i)).toBeInTheDocument(), { timeout: 3000 });
    expect(screen.getByText(/Lentils: 1 cup/i)).toBeInTheDocument();
    expect(screen.getByText(/Pick through your lentils/i)).toBeInTheDocument();
    const checkBox = await screen.findAllByRole('checkbox');
    expect(checkBox[0].checked).toEqual(true);
    expect(checkBox[2].checked).toEqual(false);
    userEvent.click(checkBox[0]);
    userEvent.click(checkBox[2]);
    expect(checkBox[0].checked).toEqual(false);
    expect(checkBox[2].checked).toEqual(true);
  });

  it('Testa se usando o id da receita da bebida A1, os ingredientes marcados já vem com check e a funcionalidade dos checks', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 17222: ['Gin', 'Grand Marnier'] }, meals: {} }));
    renderWithRouter(
      <Provider>
        <RecipeInProgress match={ drinks } />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByText(/A1/i)).toBeInTheDocument(), { timeout: 3000 });
    expect(screen.getByText(/Grand Marnier: 1 Shot/i)).toBeInTheDocument();
    expect(screen.getByText(/Pour all ingredients into a cocktail shaker,/i)).toBeInTheDocument();
    const checkBox = await screen.findAllByRole('checkbox');
    expect(checkBox[0].checked).toEqual(true);
    expect(checkBox[2].checked).toEqual(false);
    userEvent.click(checkBox[0]);
    userEvent.click(checkBox[2]);
    expect(checkBox[0].checked).toEqual(false);
    expect(checkBox[2].checked).toEqual(true);
  });

  it('testa se todos os checkbox estiverem checked aparece o botão finish que redireciona pra doneRecipes', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 17222: [] }, meals: {} }));
    const { history } = renderWithRouter(
      <Provider>
        <RecipeInProgress match={ drinks } />
      </Provider>,
    );
    const checkBox = await screen.findAllByRole('checkbox');
    Array(4).forEach((_, i) => {
      userEvent.click(checkBox[i]);
    });
    userEvent.click(screen.getByTestId('finish-recipe-btn'));
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('testa se todos os checkbox estiverem checked aparece o botão finish que redireciona pra doneRecipes', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: { 52977: [] } }));
    const { history } = renderWithRouter(
      <Provider>
        <RecipeInProgress match={ meals } />
      </Provider>,
    );
    const checkBox = await screen.findAllByRole('checkbox');
    Array(12).forEach((_, i) => {
      userEvent.click(checkBox[i]);
    });
    userEvent.click(screen.getByTestId('finish-recipe-btn'));
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
