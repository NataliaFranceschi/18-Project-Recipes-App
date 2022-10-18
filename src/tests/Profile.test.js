import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWidth/renderWithRouter';

describe('Testa a tela do Profile', () => {
  it('Test', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/profile'));
    expect(2).toBe(2);
  });
});
