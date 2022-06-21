import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import UserContext from './UserContext';

function UserProvider({ children }) {
  const [ingredientApi, setIngredientApi] = useState([]);
  const [nameApi, setNameApi] = useState([]);
  const [firstLetterApi, setFirstLetterApi] = useState([]);
  const [radioSelected, setRadioSelected] = useState({
    radio: '',
  });

  useEffect(() => {
    const fetchIngredientData = async () => {
      try {
        const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=rice';
        const response = await fetch(url);
        const data = await response.json();
        setIngredientApi(data);
      } catch (error) {
        return error;
      }
    };
    fetchIngredientData();

    const fetchNameData = async () => {
      try {
        const urlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
        const responseName = await fetch(urlName);
        const dataName = await responseName.json();
        setNameApi(dataName);
      } catch (error) {
        return error;
      }
    };
    fetchNameData();

    const fetchFirstLetter = async () => {
      try {
        const urlFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
        const responseFirstLetter = await fetch(urlFirstLetter);
        const dataFirstLetter = await responseFirstLetter.json();
        setFirstLetterApi(dataFirstLetter);
      } catch (error) {
        return error;
      }
    };
    fetchFirstLetter();
  }, []);

  const context = {
    ingredientApi,
    nameApi,
    firstLetterApi,
    radioSelected,
    setRadioSelected,
  };

  return (
    <UserContext.Provider value={ context }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
