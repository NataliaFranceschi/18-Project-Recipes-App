import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from '../utils/renderWithRouter';
import Provider from '../context/myProvider';

describe('Testa a tela Recipe Details', () => {
  const drinks = { path: '/drinks/:id', params: { id: '17222' }, url: '/drinks/17222' };
  const meals = { path: '/meals/:id', params: { id: '52977' }, url: '/meals/52977' };
  it('Testa se usando o id da receita de comida Corba, aparece o nome da receita, ingrdientes e modo de preparo', async () => {
    renderWithRouter(
      <Provider>
        <RecipeDetails match={ meals } />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByText(/corba/i)).toBeInTheDocument(), { timeout: 3000 });
    expect(screen.getByText(/Lentils: 1 cup/i)).toBeInTheDocument();
    expect(screen.getByText(/Pick through your lentils/i)).toBeInTheDocument();
  });
  it('Testa se usando o id da receita da bebida A1, aparece o nome da receita, ingrdientes e modo de preparo', async () => {
    renderWithRouter(
      <Provider>
        <RecipeDetails match={ drinks } />
      </Provider>,
    );
    await waitFor(() => expect(screen.getByText(/A1/i)).toBeInTheDocument(), { timeout: 3000 });
    expect(screen.getByText(/Grand Marnier: 1 Shot/i)).toBeInTheDocument();
    expect(screen.getByText(/Pour all ingredients into a cocktail shaker,/i)).toBeInTheDocument();
  });
  it('Testa se ao clicar em start recipe é redirecionado para pagina de Recipe in Progress', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <RecipeDetails match={ drinks } />
      </Provider>,
    );
    const startRecipe = await screen.findByText('Start Recipe');
    expect(startRecipe).toBeInTheDocument();
    userEvent.click(startRecipe);
    expect(history.location.pathname).toBe('/drinks/17222/in-progress');
  });
  it('Testa se a receita já tiver começado aparece o botão continue Recipe', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: { 52977: ['Lentils', 'Onion'] } }));
    renderWithRouter(
      <Provider>
        <RecipeDetails match={ meals } />
      </Provider>,
    );
    const continueRecipe = await screen.findByText('Continue Recipe');
    expect(continueRecipe).toBeInTheDocument();
  });
  it('Testa se quando clica em favorites a comida é salva no localstorage e se o botao de compartilhar copia a url', async () => {
    renderWithRouter(
      <Provider>
        <RecipeDetails match={ meals } />
      </Provider>,
    );
    expect(localStorage.favoriteRecipes).toBe(undefined);
    userEvent.click(screen.getByTestId('favorite-btn'));
    expect(localStorage.favoriteRecipes).not.toBe(undefined);

    navigator.clipboard = {
      writeText: jest.fn(),
    };
    userEvent.click(screen.getByTestId(/share-btn/i));
    const link = await screen.findByText(/Link copied!/i);
    expect(link).toBeInTheDocument();
  });
  it('Testa se quando clica em favorites o drink é salvo no localstorage', async () => {
    renderWithRouter(
      <Provider>
        <RecipeDetails match={ drinks } />
      </Provider>,
    );
    userEvent.click(screen.getByTestId('favorite-btn'));
    expect(localStorage.favoriteRecipes).not.toBe(undefined);
  });
  /* it('Testa se quando clica em favorites o drink é salvo no localstorage', async () => {
    const obj = {
      alcoholicOrNot: 'Alcoholic',
      category: 'Cocktail',
      id: '17222',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      name: 'A1',
      nationality: '',
      type: 'drink',
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    renderWithRouter(
      <Provider>
        <RecipeDetails match={ drinks } />
      </Provider>,
    );
    expect(localStorage.favoriteRecipes).not.toBe(undefined);
    expect(screen.getByText('ola')).toBeInTheDocument();
    console.log(localStorage);
    // const favorite = screen.getByTestId('favorite-btn');
    // userEvent.click(favorite);
    // expect(localStorage.favoriteRecipes).toBe('[]');
  }); */
});
