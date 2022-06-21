import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import headerContext from '../MyContext/headerContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const {
    headerState,
    // handleHeaderTitle,
    setHeaderState,
    fExploreNationality,
    foods,
    drinks,
    searchBar,
    setSearchBar,
    setFoods,
  } = useContext(headerContext);

  const handleProfile = ({ target }) => {
    const { name } = target;
    setHeaderState(name);
    setSearchBar(false);
    setFoods(false);
  };

  return (
    <section className="header-container">
      <Link to="/profile">
        <input
          type="image"
          name="profile"
          onClick={ handleProfile }
          src={ profileIcon }
          alt={ profileIcon }
          data-testid="profile-top-btn"
        />
      </Link>

      <div className="header-title">
        <h1 data-testid="page-title">{headerState}</h1>
      </div>

      <div>
        {(fExploreNationality || foods || drinks) && (
          <input
            type="image"
            onClick={ () => setSearchBar(!searchBar) }
            src={ searchIcon }
            alt={ searchIcon }
            data-testid="search-top-btn"
          />
        )}
      </div>
      {searchBar && <input type="text" data-testid="search-input" />}
    </section>
  );
}

export default Header;
