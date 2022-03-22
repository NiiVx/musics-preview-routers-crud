import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class ProfileEdit extends React.Component {
  render() {
    return (

      <div data-testid="page-profile-edit">
        <Header />
        Page Profile
      </div>
    );
  }
}
