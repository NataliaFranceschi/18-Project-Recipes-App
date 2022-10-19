import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa a tela do Profile', () => {
  it('Testa se a opção Done Recipes aparece', () => {
    const match = { path: '/profile' };
    renderWithRouter(<Profile match={ match } />);
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
  });

  it('Testa se a opção  Favorite Recipes aparece', () => {
    const match = { path: '/profile' };
    renderWithRouter(<Profile match={ match } />);
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
  });

  it('Testa se a opção Logout aparece', () => {
    const match = { path: '/profile' };
    renderWithRouter(<Profile match={ match } />);
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  it('Testa se o email do usuario aparece', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    const match = { path: '/profile' };
    renderWithRouter(<Profile match={ match } />);
    expect(screen.getByText('teste@teste.com')).toBeInTheDocument();
  });

  it('Testa se quando faz logout apaga o localstorage', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste1@teste1.com' }));
    const match = { path: '/profile' };
    renderWithRouter(<Profile match={ match } />);
    userEvent.click(screen.getByTestId('profile-logout-btn'));
    expect(localStorage).toHaveLength(0);
  });
});
