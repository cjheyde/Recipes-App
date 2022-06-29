import React, { useState, useEffect } from 'react';
import direita from '../images/direita.png';
import esquerda from '../images/esquerda.png';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function ComponentDrink() {
  const [drink, setDrink] = useState([]);
  const [state, setState] = useState({
    first: true,
    second: false,
    thirt: false,
  });

  const randomApi = async () => {
    try {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const urlRandomDirnks = url;
      const responseRandomDirnks = await fetch(urlRandomDirnks);
      const { drinks } = await responseRandomDirnks.json();
      setDrink(drinks);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    randomApi();
  }, []);

  const previousClick = () => {
    if (state.first) {
      setState({
        ...state,
        first: false,
        thirt: true,
      });
    } else if (state.thirt) {
      setState({
        ...state,
        second: true,
        thirt: false,
      });
    } else {
      setState({
        ...state,
        second: false,
        first: true,
      });
    }
  };
  const nextClick = () => {
    if (state.first) {
      setState({
        ...state,
        first: false,
        second: true,
      });
    } else if (state.second) {
      setState({
        ...state,
        second: false,
        thirt: true,
      });
    } else {
      setState({
        ...state,
        thirt: false,
        first: true,
      });
    }
  };

  const n4 = 4;
  const n6 = 6;
  return (
    <div className="container">
      <div className="slides" name="firstSlide">
        {
          state.first ? drink.slice(0, 2).map((el, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <img src={ el.strDrinkThumb } alt="bebida recomendada" />
              <p>{ el.strAlcoholic }</p>
              <h3 data-testid={ `${index}-recomendation-title` }>
                { el.strDrink }
              </h3>
            </div>
          ))
            : ''
        }
        <div className="slides" name="secondSlide">
          {
            state.second ? drink.slice(2, n4).map((el1, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <img src={ el1.strDrinkThumb } alt="bebida recomendada" />
                <p>{ el1.strAlcoholic }</p>
                <h3 data-testid={ `${index}-recomendation-title` }>
                  { el1.strDrink }
                </h3>
              </div>
            ))
              : ''
          }
        </div>

        <div className="slides">
          {
            state.thirt ? drink.slice(n4, n6).map((el2, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <img src={ el2.strDrinkThumb } alt="bebida recomendada" />
                <p>{ el2.strAlcoholic }</p>
                <h3 data-testid={ `${index}-recomendation-title` }>
                  { el2.strDrink }
                </h3>
              </div>
            ))
              : ''
          }
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={ previousClick }
        >
          <img src={ esquerda } alt="favorite" width="25" height="25" />
        </button>
        <button
          type="button"
          onClick={ nextClick }
        >
          <img src={ direita } alt="favorite" width="25" height="25" />
        </button>
      </div>
    </div>
  );
}
