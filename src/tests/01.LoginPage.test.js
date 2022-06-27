import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import LoginPage from '../pages/LoginPage';

describe('Testa o componente <LoginPage', () => {
  it('Verifica se existe os inputs e o botão na tela', () => {
    renderWithRouter(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const userNameInput = screen.getByRole('textbox', {
      name: /login/i,
    });
    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Verifica se o botão login está desabilitado ao renderizar a tela', () => {
    renderWithRouter(<LoginPage />);

    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('Verifica se ao digitar o email e senha, o botão fica habilitado', () => {
    renderWithRouter(<LoginPage />);

    const USER_NAME = 'teste@teste.com';
    const PASSWORD = '1234567';
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const userNameInput = screen.getByRole('textbox', {
      name: /login/i,
    });
    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(userNameInput, USER_NAME);
    userEvent.type(passwordInput, PASSWORD);

    expect(loginButton).toBeEnabled();
    expect(userNameInput).toHaveValue(USER_NAME);
    expect(passwordInput).toHaveValue(PASSWORD);
  });

  it('Verifica se ao digitar o email e senha errados, o botão fica desabilitado', () => {
    renderWithRouter(<LoginPage />);

    const USER_NAME = 'teste';
    const PASSWORD = '167';
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const userNameInput = screen.getByRole('textbox', {
      name: /login/i,
    });
    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(userNameInput, USER_NAME);
    userEvent.type(passwordInput, PASSWORD);

    expect(loginButton).toBeDisabled();
    expect(userNameInput).toHaveValue(USER_NAME);
    expect(passwordInput).toHaveValue(PASSWORD);
  });

  it('Verifica se clicar em login, é redirecionado para a pagina foods', () => {
    const { history } = renderWithRouter(<LoginPage />);

    const USER_NAME = 'teste@teste.com';
    const PASSWORD = '16712347';
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const userNameInput = screen.getByRole('textbox', {
      name: /login/i,
    });
    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(userNameInput, USER_NAME);
    userEvent.type(passwordInput, PASSWORD);

    expect(loginButton).toBeEnabled();
    expect(userNameInput).toHaveValue(USER_NAME);
    expect(passwordInput).toHaveValue(PASSWORD);

    userEvent.click(loginButton);
    const { pathname } = history.location;

    expect(pathname).toBe('/foods');
  });

  it('Verifica se é salvo no localStorage o email, mealsToken, e drinksToken', () => {
    const { history } = renderWithRouter(<LoginPage />);

    const USER_NAME = 'teste@teste.com';
    const PASSWORD = '16712347';
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const userNameInput = screen.getByRole('textbox', {
      name: /login/i,
    });
    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(userNameInput, USER_NAME);
    userEvent.type(passwordInput, PASSWORD);

    expect(loginButton).toBeEnabled();
    expect(userNameInput).toHaveValue(USER_NAME);
    expect(passwordInput).toHaveValue(PASSWORD);

    userEvent.click(loginButton);
    const { pathname } = history.location;

    expect(pathname).toBe('/foods');

    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));
    const user = JSON.parse(localStorage.getItem('user'));

    expect(mealsToken).toBe(1);
    expect(cocktailsToken).toBe(1);
    expect(user).toStrictEqual({ email: USER_NAME });
  });
});
