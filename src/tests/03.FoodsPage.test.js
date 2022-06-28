import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testa a pagina <Foods />', () => {
  it('Verifica o Header e o Footer da pagina Foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const headerTitle = screen.getByTestId('page-title');
    const profileIcon = screen.getByRole('button', {
      name: /profile icon/i,
    });
    const searchIcon = screen.getByRole('button', {
      name: /search icon/i,
    });

    expect(profileIcon).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

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

  it('Verifica se ao clicar em perfil é redirecionado pra pagina de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const profileIcon = screen.getByRole('button', {
      name: /profile icon/i,
    });

    expect(profileIcon).toBeInTheDocument();

    userEvent.click(profileIcon);
    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });

  // it('Verifica se é renderizado os botões de opção de ingrediente', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');

  //   const searchBtn = screen.findByTestId('exec-search-btn');
  //   const beefBtn = screen.getByRole('button', {
  //     name: /beef/i,
  //   });
  //   const breakfastBtn = screen.findByTestId('Breakfast-category-filter');
  //   const chickenBtn = screen.findByTestId('Chicken-category-filter');
  //   const dessertBtn = screen.findByTestId('Dessert-category-filter');
  //   const goatBtn = screen.findByTestId('Goat-category-filter');
  //   const allBtn = screen.findByTestId('All-category-filter');

  //   expect(searchBtn).toBeInTheDocument();
  //   await expect(beefBtn).toBeInTheDocument();
  //   expect(breakfastBtn).toBeInTheDocument();
  //   expect(chickenBtn).toBeInTheDocument();
  //   expect(dessertBtn).toBeInTheDocument();
  //   expect(goatBtn).toBeInTheDocument();
  //   expect(allBtn).toBeInTheDocument();
  // });

  it('Verifica se ao clicar em drinks, vai para pagina drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const drinkBtn = screen.getByRole('img', {
      name: /bebidas/i,
    });

    expect(drinkBtn).toBeInTheDocument();

    userEvent.click(drinkBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/drinks');
  });

  it('Verifica se ao clicar em explore, vai para pagina explore', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const exploreBtn = screen.getByRole('img', {
      name: /explorar/i,
    });

    expect(exploreBtn).toBeInTheDocument();
    userEvent.click(exploreBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/explore');
  });

  it('Verifica se ao clicar em food, volta pra pagina foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');

    const foodsBtn = screen.getByRole('img', {
      name: /comidas/i,
    });

    expect(foodsBtn).toBeInTheDocument();
    userEvent.click(foodsBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/foods');
  });
});
