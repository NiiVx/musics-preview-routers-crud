import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  render() {
    return (
      <Link to="/profile" data-testid="page-profile">
        <div>Page Profile</div>
      </Link>);
  }
}

export default Profile;
