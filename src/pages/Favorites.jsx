import React from 'react';
import { Link } from 'react-router-dom';

class Favorites extends React.Component {
  render() {
    return (
      <Link to="/favorites" data-testid="page-favorites">
        <div>Page favorites</div>
      </Link>);
  }
}

export default Favorites;
