import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import headerContext from '../MyContext/headerContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { setHeaderState, setSearchBar, setFoods } = useContext(headerContext);
  const userEmail = JSON.parse(localStorage.getItem('user'));

  const handleDoneRecepies = () => {
    setHeaderState('Done Recepies');
    setSearchBar(false);
    setFoods(false);
  };
  const handleFavoriteRecepies = () => {
    setHeaderState('Favorite Recepies');
    setSearchBar(false);
    setFoods(false);
  };

  const handleLogout = () => {
    setHeaderState('Foods');
    localStorage.setItem('user', JSON.stringify({ email: '' }));
    localStorage.setItem('mealsToken', JSON.stringify());
    localStorage.setItem('cocktailsToken', JSON.stringify());
  };

  return (
    <>
      <Header />
      <p data-testid="profile-email">{userEmail.email}</p>

      <Link to="/done-recipes">
        <button
          type="button"
          onClick={ handleDoneRecepies }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>

      <Link to="/favorite-recipes">
        <button
          type="button"
          onClick={ handleFavoriteRecepies }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>

      <Link to="/">
        <button
          type="button"
          onClick={ handleLogout }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </Link>

      <Footer />
    </>
  );
}

export default Profile;
