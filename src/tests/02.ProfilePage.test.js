import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

const headerTitleId = 'page-title';

describe('Testa o componente <Profile/>', () => {
  it('Verifica o Header e o Footer da pagina Profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const headerTitle = screen.getByTestId(headerTitleId);
    const profileIcon = screen.getByRole('button', {
      name: /profile icon/i,
    });

    expect(profileIcon).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();

    const drinkIcon = screen.getByRole('img', {
      name: /bebidas/i,
    });
    const exploreIcon = screen.getByRole('img', {
      name: /explorar/i,
    });
    const foodIcon = screen.getByRole('img', {
      name: /comidas/i,
    });

    expect(drinkIcon).toBeInTheDocument();
    expect(exploreIcon).toBeInTheDocument();
    expect(foodIcon).toBeInTheDocument();
  });

  it('Verifica se tem email, done recipes favorte e logout', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    const doneRecepiesBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });
    expect(doneRecepiesBtn).toBeInTheDocument();

    const FavoriteRecepiesBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    expect(FavoriteRecepiesBtn).toBeInTheDocument();

    const LogoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(LogoutBtn).toBeInTheDocument();
  });

  it('Verifica se ao clicar em Done Recipes é levado pra page done', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const doneRecepiesBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });
    expect(doneRecepiesBtn).toBeInTheDocument();

    userEvent.click(doneRecepiesBtn);
    const { pathname } = history.location;
    const headerTitle = screen.getByTestId(headerTitleId);
    const profileIcon = screen.getByRole('button', {
      name: /profile icon/i,
    });

    expect(pathname).toBe('/done-recipes');
    expect(headerTitle).toBeInTheDocument();
    // expect(headerTitle).toHaveTextContent('Done Recipes');
    expect(profileIcon).toBeInTheDocument();
  });

  it('Verifica se ao clicar em Fav Recipes é levado pra page Fav', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const favoriteRecipesBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    expect(favoriteRecipesBtn).toBeInTheDocument();

    userEvent.click(favoriteRecipesBtn);
    const { pathname } = history.location;
    const headerTitle = screen.getByTestId(headerTitleId);
    const profileIcon = screen.getByRole('button', {
      name: /profile icon/i,
    });

    expect(pathname).toBe('/favorite-recipes');
    expect(headerTitle).toBeInTheDocument();
    // expect(headerTitle).toHaveTextContent('Favorite Recipes');
    expect(profileIcon).toBeInTheDocument();
  });

  it('Verifica se ao clicar em logout é redirecionado pro login', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });

    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);
    const { pathname } = history.location;
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const userNameInput = screen.getByRole('textbox', {
      name: /login/i,
    });
    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });

    expect(pathname).toBe('/');
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));
    const user = JSON.parse(localStorage.getItem('user'));

    expect(mealsToken).toBe(null);
    expect(cocktailsToken).toBe(null);
    expect(user).toStrictEqual(null);
  });
});
