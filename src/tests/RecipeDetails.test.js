import React from 'react';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { cleanup, screen, wait, fireEvent } from '@testing-library/react';
import oneMeal from '../../cypress/mocks/oneMeal';
import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const match = {
  params: {
    recipeId: '52771',
  },
};

const PHOTO_TEST_ID = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const SHARE_BTN = 'share-btn';
const FAV_BTN = 'favorite-btn';
const RECIPE_CATEGORY = 'recipe-category';
const INSTRUCTIONS = 'instructions';
const VIDEO_SRC = 'video';
const START_RECIPE_BTN = 'start-recipe-btn';
const INGREDIENTS = ['0', '1', '2', '3', '4', '5', '6', '7'];
const RECOMENDATION0 = '0-recomendation-card';
const RECOMENDATION1 = '1-recomendation-card';
const RECOMENDATION2 = '2-recomendation-card';
const RECOMENDATION3 = '3-recomendation-card';
const RECOMENDATION4 = '4-recomendation-card';
const RECOMENDATION5 = '5-recomendation-card';
const IN_PROGRESS_PATH = '/comidas/52771/in-progress';
let MEAL_PATH = '/comidas/52771';
const API_MAX_CALLS = 3;

const testHistory = createMemoryHistory({ initialEntries: [MEAL_PATH] });
describe('Testa a página de detalhes da receita', () => {
  const mealResponse = {
    json: jest.fn().mockResolvedValue(oneMeal),
  };
  const mockOneMeal = jest.spyOn(global, 'fetch');
  mockOneMeal.mockResolvedValueOnce(mealResponse);

  const mealInProgress = {
    cocktails: {},
    meals: {
      52771: [0],
    },
  };

  const mealDone = [{
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '8/15/2021',
    tags: ['Pasta', 'Curry'],
  }];

  beforeEach(() => {
    MEAL_PATH = '/comidas/52771';
  });

  afterEach(cleanup);

  it('Testa se os elementos corretos estão todos na tela', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals/52771'));

    const img = await screen.findByTestId(PHOTO_TEST_ID);
    const title = await screen.findByTestId(RECIPE_TITLE);
    const shareBtn = await screen.findByTestId(SHARE_BTN);
    const favBtn = await screen.findByTestId(FAV_BTN);
    const category = await screen.findByTestId(RECIPE_CATEGORY);
    const instructions = await screen.findByTestId(INSTRUCTIONS);
    // const videoSrc = await screen.findByTestId(VIDEO_SRC);
    // const startBtn = await screen.findByTestId(START_RECIPE_BTN);
    const recomendation0 = await findByTestId(RECOMENDATION0);
    const recomendation1 = await findByTestId(RECOMENDATION1);
    const recomendation2 = await findByTestId(RECOMENDATION2);
    const recomendation3 = await screen.findByTestId(RECOMENDATION3);
    const recomendation4 = await screen.findByTestId(RECOMENDATION4);
    const recomendation5 = await screen.findByTestId(RECOMENDATION5);

    await act(async () => {
      INGREDIENTS.forEach(async (el) => {
        const ingredient = await screen.findByTestId(`${el}-ingredient-name-and-measure`);
        expect(ingredient).toBeInTheDocument();
      });
    });

    // expect(ingredientsString).toBeInTheDocument();
    // expect(ingredientsString).toHaveTextContent('Ingredientes');
    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Spicy Arrabiata Penne');
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(videoSrc).toBeInTheDocument();
    expect(recomendation0).toBeInTheDocument();
    expect(recomendation1).toBeInTheDocument();
    expect(recomendation2).toBeInTheDocument();
    expect(recomendation3).toBeInTheDocument();
    expect(recomendation4).toBeInTheDocument();
    expect(recomendation5).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    expect(mockOneMeal).toBeCalled();
    expect(mockOneMeal).toBeCalledTimes(API_MAX_CALLS);
  });

  // it(
  //   'Botão deve iniciar como iniciar receita e após o click, continuar receita',
  //   async () => {
  //     localStorage.setItem('inProgressRecipes', JSON.stringify(mealInProgress));
  //     const {
  //       findByTestId,
  //     } = renderWithRouter(<RecipeDetails match={ match } />, testHistory);
  //     const startBtnBefore = await findByTestId(START_RECIPE_BTN);
  //     expect(startBtnBefore).toHaveTextContent('Continuar Receita');
  //   },
  // );

  // it('Espera que o botão de iniciar ou continuar receita não exista', async () => {
  //   localStorage.setItem('doneRecipes', JSON.stringify(mealDone));
  //   const {
  //     queryByTestId,
  //   } = renderWithRouter(<RecipeDetails match={ match } />, testHistory);
  //   await wait(() => {
  //     const startBtn = queryByTestId(START_RECIPE_BTN);
  //     expect(startBtn).not.toBeInTheDocument();
  //   });
  // });

  // it('Espera que a página seja redirecionada corretamente', async () => {
  //   localStorage.clear();
  //   const {
  //     findByTestId,
  //     history,
  //   } = renderWithRouter(<RecipeDetails match={ match } />, testHistory);
  //   const startBtn = await findByTestId(START_RECIPE_BTN);
  //   fireEvent.click(startBtn);
  //   expect(history.location.pathname).toEqual(IN_PROGRESS_PATH);
  // });
});
