import React from 'react';
import { Link } from 'react-router-dom';

class ProfileEdit extends React.Component {
  render() {
    return (
      <Link to="/profile/edit" data-testid="page-profile-edit">
        <div>Page Profile</div>
      </Link>);
  }
}

export default ProfileEdit;
