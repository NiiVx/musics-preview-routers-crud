import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserFromApi();
  }

  getUserFromApi = () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ loading: false, userInfo: user });
    });
  }

  render() {
    const { loading, userInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <section>
            {`${userInfo.name}`}
            <p>{userInfo.email}</p>
            <p>{userInfo.description}</p>
            <img
              data-testid="profile-image"
              src={ userInfo.image }
              alt={ userInfo.name }
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
