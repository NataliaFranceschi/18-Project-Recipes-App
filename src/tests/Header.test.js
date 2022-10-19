import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa o componente Header', () => {
  it('Testa se ao clicar no botão de profile, redireciona para página Profile', () => {
    const name = '/meals';
    const { history } = renderWithRouter(<Header name={ name } />);
    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/profile');
  });
});
