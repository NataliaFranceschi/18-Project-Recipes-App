import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProfileComponent() {
  const [email, setEmail] = useState({});
  useEffect(() => {
    const emailLocalStorage = localStorage.getItem('user');
    if (emailLocalStorage === null || emailLocalStorage === undefined) {
      setEmail({ email: '' });
    } else {
      setEmail(JSON.parse(emailLocalStorage));
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <p data-testid="profile-email">{email.email}</p>
      <div>

        <Link to="/done-recipes">
          <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        </Link>
      </div>
      <div>

        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
      </div>
      <div>

        <Link to="/">
          <button
            onClick={ clearLocalStorage }
            type="button"
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProfileComponent;
