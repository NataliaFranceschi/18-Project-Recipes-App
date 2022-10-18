import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import { ID_BUTTON_GET_SEARCH, ID_BUTTON_SEARCH, ID_INPUT_SEARCH, ID_RADIO_FIRST_LETTER, ID_RADIO_INGREDIENT, ID_RADIO_NAME } from '../utils/constants';

describe('Testa o component SearchBar', () => {
  test('Verifica se é possível pesquisar pela primeira letra', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const radioButton = screen.getByTestId(ID_RADIO_FIRST_LETTER);
    userEvent.click(radioButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    userEvent.paste(searchInput, 'onion');

    const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    userEvent.click(buttonSearch);
  });

  test('Verifica se é possível pesquisar pelo ingrediente na pagina de comidas.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const radioButton = screen.getByTestId(ID_RADIO_INGREDIENT);
    userEvent.click(radioButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    userEvent.type(searchInput, 'bacon');

    const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    userEvent.click(buttonSearch);
  });

  test('Verifica se é possível pesquisar pela primeira letra do ingrediente na pagina de drinks.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const radioButton = screen.getByTestId(ID_RADIO_FIRST_LETTER);
    userEvent.click(radioButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    userEvent.type(searchInput, 'a');

    const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    userEvent.click(buttonSearch);
  });

  test('Verifica se é possível pesquisar pelo ingrediente na pagina de drinks.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const radioButton = screen.getByTestId(ID_RADIO_INGREDIENT);
    userEvent.click(radioButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    userEvent.type(searchInput, 'cognac');

    const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    userEvent.click(buttonSearch);
  });

  test('Verifica se ao pesquisar na pagina de comida por mais de um letra o alerta é acionado', async () => {
    global.alert = jest.fn(() => 'Your search must have only 1 (one) character');

    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const radioButton = screen.getByTestId(ID_RADIO_FIRST_LETTER);
    userEvent.click(radioButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    userEvent.paste(searchInput, 'mango');

    const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    global.alert.mockClear();
  });

  test('Verifica se retorna alert quando a busca não tem resultado', async () => {
    global.alert = jest.fn(() => 'Sorry, we haven\'t found any recipes for these filters.');
    const { history } = renderWithRouter(<App />);

    history.push('/meals');

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const radioButton = screen.getByTestId(ID_RADIO_INGREDIENT);
    userEvent.click(radioButton);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    userEvent.paste(searchInput, 'grupo');

    const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);

    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    global.alert.mockClear();
  });

  // test('Verifica se quando apenas um comida é encontrada, o usuário é redirecionado para a tela de detalhes', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/meals');

  //   const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
  //   userEvent.click(searchButton);

  //   const radioButton = screen.getByTestId(ID_RADIO_INGREDIENT);
  //   userEvent.click(radioButton);

  //   const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
  //   userEvent.paste(searchInput, 'burek');

  //   const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);

  //   userEvent.click(buttonSearch);
  // });
  test('Verifica se quando apenas um comida é encontrada, o usuário é redirecionado para a tela de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const radio = screen.getByTestId(ID_RADIO_NAME);
    userEvent.click(radio);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    userEvent.paste(searchInput, 'Arrabiata');

    const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });

  test('Verifica se quando apenas um drink é encontrada, o usuário é redirecionado para a tela de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const radio = screen.getByTestId(ID_RADIO_NAME);
    userEvent.click(radio);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    userEvent.paste(searchInput, 'Lassi - Mango');

    const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/12698'));
  });

  test('Verifica se nenhum drink é encontrado, o usuário recebe um ALERT', async () => {
    global.alert = jest.fn(() => 'Sorry, we haven\'t found any recipes for these filters.');
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const searchButton = screen.getByTestId(ID_BUTTON_SEARCH);
    userEvent.click(searchButton);

    const radio = screen.getByTestId(ID_RADIO_NAME);
    userEvent.click(radio);

    const searchInput = screen.getByTestId(ID_INPUT_SEARCH);
    userEvent.paste(searchInput, 'grupo24');

    const buttonSearch = screen.getByTestId(ID_BUTTON_GET_SEARCH);
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
    global.alert.mockClear();
  });
});
