import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

function Header() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  async function getUserName() {
    setLoading(true);
    const user = await getUser();
    const { name } = user;
    setUserName(name);
    setLoading(false);
  }
  useEffect(() => {
    getUserName();
  }, []);

  return (
    <header data-testid="header-component" className="header-container">
      {loading
        ? <Loading />
        : (
          <h1 data-testid="header-user-name">{`User: ${userName}!`}</h1>
        )}
      <nav>
        <Link to="/search" data-testid="link-to-search">   -- Search  --  </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites-- </Link>
        <Link to="/profile" data-testid="link-to-profile"> --Profile-- </Link>
      </nav>
    </header>
  );
}
export default Header;
