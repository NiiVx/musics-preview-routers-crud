import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  render() {
    return (<Link to="/search" data-testid="page-search"><div>Search</div></Link>);
  }
}

export default Search;
