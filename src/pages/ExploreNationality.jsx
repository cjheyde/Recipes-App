import React, { useContext, useEffect } from 'react';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreNationality() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);

  useEffect(() => {
    setHeaderState('Explore Nationalities');
    setSearchBar(false);
    setFoods(true);
  }, []);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default ExploreNationality;
