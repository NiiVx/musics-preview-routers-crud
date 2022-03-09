import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Album extends React.Component {
  render() {
    return (
      <Link to="/album/:id" data-testid="page-album">
        <Header />
        <div>Page Album</div>
      </Link>);
  }
}
