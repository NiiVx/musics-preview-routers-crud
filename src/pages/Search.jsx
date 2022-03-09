import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <Link to="/search" data-testid="page-search">
        <Header />
        <div>Search</div>
      </Link>);
  }
}

export default Search;
