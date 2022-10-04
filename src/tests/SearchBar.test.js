import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import { ID_BUTTON_GET_SEARCH, ID_BUTTON_SEARCH, ID_INPUT_SEARCH, ID_RADIO_FIRST_LETTER, ID_RADIO_INGREDIENT, ID_RADIO_NAME, INGRENDIENTE_SEARCH } from '../utils/constants';
import dataMockMeals from './mocks/dataMealsMock';
import dataMockDrinks from './mocks/dataDrinksMock';

const MESSAGE = 'Your search must have only 1 (one) character';
const MESSAGE2 = 'Sorry, we haven\t found any recipes for these filters.';

describe('Testando componente SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: dataMockMeals,
        drinks: dataMockDrinks,
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Se SearchBar é renderizado na pagina meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    const searchTypeButton = screen.getByTestId(ID_INPUT_SEARCH);
    expect(searchInput).toBeInTheDocument();
    expect(searchTypeButton).toBeInTheDocument();
  });

  it('Se é possivel pesquisar um determinado ingrediente na pagina de comidas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: dataMockMeals,
      }),
    });
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    const ingredientRadioButton = screen.getByTestId(ID_RADIO_INGREDIENT);
    const searchTypeButton = screen.getByTestId(ID_BUTTON_GET_SEARCH);

    userEvent.type(searchInput, 'cumin');
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);

    expect(ingredientRadioButton).toBeChecked();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=cumin');
  });

  it('Se é possivel pesquisar pela primeira letra na pagina de drinks', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: dataMockDrinks,
      }),
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    const firstLetterRadioButton = screen.getByTestId(ID_RADIO_FIRST_LETTER);
    const searchTypeButton = screen.getByTestId(ID_BUTTON_GET_SEARCH);

    userEvent.type(searchInput, 't');
    userEvent.click(firstLetterRadioButton);
    userEvent.click(searchTypeButton);

    expect(firstLetterRadioButton).toBeChecked();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=t');
  });

  it('Se redireciona caso pesquise apenas um receita', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(ID_BUTTON_SEARCH);
    const searchType = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    const nameRadio = screen.getByTestId(ID_RADIO_NAME);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(searchType);

    // expect(history.location.pathname).toBe('/meals');
  });

  it('Verifica se ao clicar no input PELA LETRA, e digitar mais de uma letra um alerta é acionado.', async () => {
    jest.spyOn(global, 'alert')
      .mockImplementation();

    // jest.spyOn(global, 'alert')
    //   .mockImplementation(() => MESSAGE2);

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    const firstLetterRadio = screen.getByTestId(ID_RADIO_FIRST_LETTER);
    const buttonGetSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);

    userEvent.type(searchInput, 'xablau');
    userEvent.click(firstLetterRadio);
    userEvent.click(buttonGetSearch);

    expect(global.alert).toHaveBeenCalled();
    // expect(global.alert).toBeCalled();
    // expect(global.alert()).toBe(MESSAGE);
  });

  it('Pesquisa por uma ingrediente que não existe.', async () => {
    // global.alert = jest.fn();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [],
      }),
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    const buttonGetSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    const igredienteRadio = screen.getByTestId(ID_RADIO_INGREDIENT);

    userEvent.type(searchInput, 'xablau');
    userEvent.click(igredienteRadio);
    userEvent.click(buttonGetSearch);

    expect(global.alert).toHaveBeenCalled(0);

    // console.log(global.alert);
    // // expect(alert).toBeCalled();
    // console.log(global.alert());
    // expect(global.alert()).toBe(MESSAGE2);
    // // expect(global.alert()).toBe(MESSAGE);
  });
});
