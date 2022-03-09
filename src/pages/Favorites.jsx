import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Favorites extends React.Component {
  render() {
    return (
      <Link to="/favorites" data-testid="page-favorites">
        <Header />
        <div>Page favorites</div>
      </Link>);
  }
}
